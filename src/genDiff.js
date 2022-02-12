import _ from 'lodash';
import parsers from './parsers.js';
import formatter from './formatters/index.js';

const getTree = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { status: 'nest', key, children: getTree(file1[key], file2[key]) };
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { status: 'deleted', key, value1: file1[key] };
    } if (_.has(file1, key) && (file1[key] === file2[key])) {
      return { status: 'unchanged', key, value1: file2[key] };
    } if (_.has(file1, key) && (file1[key] !== file2[key])) {
      return {
        status: 'changed', key, value1: file1[key], value2: file2[key],
      };
    } if (!_.has(file1, key) && _.has(file2, key)) {
      return { status: 'added', key, value1: file2[key] };
    }
    return 'error';
  });
  return diff;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(filepath1);
  const file2 = parsers(filepath2);
  const tree = getTree(file1, file2);
  const diffObject = formatter(tree, formatName);
  return diffObject;
};

export default genDiff;
