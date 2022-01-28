#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('0.0.1')
  .usage('[options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });
// .argument('[options]', '<filepath1>', '<filepath2>');
program.parse();

// path.resolve('/foo/bar', './baz');
// // Returns: '/foo/bar/baz'

// path.resolve('/foo/bar', '/tmp/file/');
// // Returns: '/tmp/file'

// path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// // If the current working directory is /home/myself/node,
// // this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
