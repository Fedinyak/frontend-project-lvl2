import _ from 'lodash';
import parsers from './parsers.js';
import formatter from './formatters/index.js';
import readFile from './readFile.js';
import getFormat from './getFormat.js';

const getTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { status: 'deleted', key, value1: data1[key] };
    }
    if (_.has(data1, key) && (data1[key] === data2[key])) {
      return { status: 'unchanged', key, value1: data2[key] };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { status: 'added', key, value1: data2[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { status: 'nest', key, children: getTree(data1[key], data2[key]) };
    }
    if (_.has(data1, key) && (data1[key] !== data2[key])) {
      return {
        status: 'changed', key, value1: data1[key], value2: data2[key],
      };
    }
    throw new Error('Error, can\'t compare files');
  });
  return diff;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const data1 = parsers(file1, format1);
  const data2 = parsers(file2, format2);
  const tree = getTree(data1, data2);
  const diffObject = formatter(tree, formatName);
  return diffObject;
};

export default genDiff;
