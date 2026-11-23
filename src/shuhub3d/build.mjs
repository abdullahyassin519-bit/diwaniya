import { build } from 'esbuild';
await build({ entryPoints: [new URL('./war3d.js', import.meta.url).pathname], bundle: true, minify: true, format: 'iife', target: ['es2019', 'safari14'], outfile: new URL('../../public/shuhub/war3d.js', import.meta.url).pathname, legalComments: 'none', logLevel: 'info' });
