import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

// const file1 = {
//   "host": "hexlet.io",
//   "timeout": 50,
//   "proxy": "123.234.53.22",
//   "follow": false
// };

// const file2 = {
//   "timeout": 20,
//   "verbose": true,
//   "host": "hexlet.io"
// };

const genDiff = (filepath1, filepath2) => {
  // readFile('/etc/passwd', 'utf8', callback);
  const file1 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath1), 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath2), 'utf8'));

  // const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf8'));
  // const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2), 'utf8'));

  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const diffKeys = [];

  sortedKeys.map((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      diffKeys.push(`\n  - ${key}: ${file1[key]}`);
    } else if (_.has(file1, key) && (file1[key] === file2[key])) {
      diffKeys.push(`\n    ${key}: ${file2[key]}`);
    } else if (_.has(file1, key) && (file1[key] !== file2[key])) {
      diffKeys.push(`\n  - ${key}: ${file1[key]}`);
      diffKeys.push(`\n  + ${key}: ${file2[key]}`);
    } else {
      diffKeys.push(`\n  + ${key}: ${file2[key]}`);
    }
    return diffKeys;
  });

  const joinKeys = diffKeys.join();
  const addBraces = `{${joinKeys}\n}`;
  // console.log(addBraces);

  return addBraces;
};

export default genDiff;

// const test1 = genDiff(file1, file2);
// console.log(test1);
