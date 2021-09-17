npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH
rm -rf node_modules && rm package-lock.json && npm cache clear --force && npm cache clean --force && npm i
npm run node-update && npm run node-clean
npm uninstall canvas && npm i canvas