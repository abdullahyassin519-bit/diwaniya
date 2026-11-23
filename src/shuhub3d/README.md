# شُهُب — 3D renderer source

`war3d.js` here is the source of `public/shuhub/war3d.js` (the committed, minified bundle that the game loads).
The battle rules are **not** here: they live in `public/shuhub/war-core.js` and are shared with the server and tests.

Rebuild after editing (three.js 0.187, esbuild 0.25):

```sh
mkdir -p /tmp/esb && (cd /tmp/esb && npm i esbuild@0.25 three@0.187.0)
ln -sfn /tmp/esb/node_modules src/shuhub3d/node_modules
node src/shuhub3d/build.mjs
```

The deploy does not build anything: Render serves the committed bundle.
