import _ from 'lodash';
import parsers from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parsers(filepath1);

  const file2 = parsers(filepath2);

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

  return addBraces;
};

export default genDiff;
