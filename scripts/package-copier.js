const fs = require('fs');

const { name, dependencies, engines } = require('../package.json');

const dontNeedForFirebase = [ '@percy/script', 'cypress', 'puppeteer', 'react-native', 'expo', 'expo-cli', 'nodemon' ];

dontNeedForFirebase.forEach(_package => delete dependencies[_package]);

const newPackage = {
  name,
  main: "index.js",
  dependencies,
  engines,
};

fs.writeFileSync('dist/package.json', JSON.stringify(newPackage, null, "  "));
