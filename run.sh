node node_modules/typescript/bin/tsc --module commonjs --outDir build src/server.ts
node node_modules/typescript/bin/tsc --module commonjs --outDir build/client src/client/client.ts
node node_modules/browserify/bin/cmd.js -o static/js/client.js build/client/client.js
node build/server.js