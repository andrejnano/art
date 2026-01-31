#!/usr/bin/env node

/**
 * MCP server for the recursive generative art playground.
 * Gives Claude programmatic awareness of the project's creative state.
 *
 * Tools:
 *   list_sketches      — catalog of all sketches with metadata
 *   read_lineage       — directed ancestry graph
 *   query_genome       — accumulated aesthetic parameters
 *   read_sketch_source — fetch a sketch's HTML source
 *   append_evolution_log — write to the chronicle
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readdir, readFile, writeFile, appendFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SKETCHES_DIR = join(ROOT, 'sketches');
const SYSTEMS_DIR = join(ROOT, 'systems');

const server = new Server(
  { name: 'art-mcp', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

// --- tool definitions ---

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_sketches',
      description:
        'List all sketches in the art project with their metadata. Returns an array of meta.json contents plus directory paths.',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'read_lineage',
      description:
        'Read the lineage graph showing how sketches evolved from each other. Returns the directed graph from lineage.json.',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'query_genome',
      description:
        'Read the accumulated aesthetic genome — parameters, palettes, and patterns that have been successful across sketches.',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'read_sketch_source',
      description:
        'Read the full HTML source of a sketch for analysis.',
      inputSchema: {
        type: 'object',
        properties: {
          sketchId: {
            type: 'string',
            description: 'The sketch ID (e.g., "001") or directory name (e.g., "001-organic-turbulence")',
          },
        },
        required: ['sketchId'],
      },
    },
    {
      name: 'append_evolution_log',
      description:
        'Append an entry to the evolution log. Use this to record creative decisions, observations, and mutations as they happen.',
      inputSchema: {
        type: 'object',
        properties: {
          entry: {
            type: 'string',
            description: 'The log entry text. Will be timestamped automatically.',
          },
          sketchId: {
            type: 'string',
            description: 'Optional sketch ID this entry relates to.',
          },
        },
        required: ['entry'],
      },
    },
  ],
}));

// --- tool implementations ---

async function findSketchDirs() {
  try {
    const entries = await readdir(SKETCHES_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && /^\d{3}-/.test(e.name))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

async function findSketchDir(sketchId) {
  const dirs = await findSketchDirs();
  // Match by ID prefix or full directory name
  return dirs.find(
    (d) => d === sketchId || d.startsWith(sketchId + '-')
  );
}

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'list_sketches': {
      const dirs = await findSketchDirs();
      const sketches = [];

      for (const dir of dirs) {
        try {
          const metaPath = join(SKETCHES_DIR, dir, 'meta.json');
          const raw = await readFile(metaPath, 'utf-8');
          const meta = JSON.parse(raw);
          sketches.push({ ...meta, _dir: dir });
        } catch {
          sketches.push({ _dir: dir, _error: 'Could not read meta.json' });
        }
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(sketches, null, 2) }],
      };
    }

    case 'read_lineage': {
      try {
        const raw = await readFile(join(SYSTEMS_DIR, 'lineage.json'), 'utf-8');
        return {
          content: [{ type: 'text', text: raw }],
        };
      } catch {
        return {
          content: [{ type: 'text', text: '{"nodes":[],"edges":[]}' }],
        };
      }
    }

    case 'query_genome': {
      try {
        const raw = await readFile(join(SYSTEMS_DIR, 'genome.json'), 'utf-8');
        return {
          content: [{ type: 'text', text: raw }],
        };
      } catch {
        return {
          content: [
            { type: 'text', text: '{"generation":0,"traits":{}}' },
          ],
        };
      }
    }

    case 'read_sketch_source': {
      const dir = await findSketchDir(args.sketchId);
      if (!dir) {
        return {
          content: [
            {
              type: 'text',
              text: `Sketch "${args.sketchId}" not found.`,
            },
          ],
          isError: true,
        };
      }
      try {
        const html = await readFile(
          join(SKETCHES_DIR, dir, 'sketch.html'),
          'utf-8'
        );
        return {
          content: [{ type: 'text', text: html }],
        };
      } catch (err) {
        return {
          content: [
            { type: 'text', text: `Error reading sketch: ${err.message}` },
          ],
          isError: true,
        };
      }
    }

    case 'append_evolution_log': {
      const timestamp = new Date().toISOString().split('T')[0];
      const prefix = args.sketchId ? `[${args.sketchId}] ` : '';
      const logEntry = `\n## ${timestamp} ${prefix}\n\n${args.entry}\n`;

      try {
        await appendFile(
          join(SYSTEMS_DIR, 'evolution-log.md'),
          logEntry,
          'utf-8'
        );
        return {
          content: [{ type: 'text', text: 'Entry appended to evolution log.' }],
        };
      } catch (err) {
        return {
          content: [
            {
              type: 'text',
              text: `Error writing to evolution log: ${err.message}`,
            },
          ],
          isError: true,
        };
      }
    }

    default:
      return {
        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
});

// --- start ---

const transport = new StdioServerTransport();
await server.connect(transport);
