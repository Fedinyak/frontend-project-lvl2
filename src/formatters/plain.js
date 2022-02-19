import _ from 'lodash';

const getParent = (parent, str = '') => {
  if (parent === '') {
    return str;
  }
  return `${str}${parent}`;
};

const stringifyValue = (value) => {
  if (value === '') {
    return '\'\'';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const plain = (data, acc = '') => {
  const parent = getParent(acc);
  const result = data.map((item) => {
    if (item.status === 'nest') {
      return `${plain(item.children, `${acc + item.key}.`)}`;
    }
    if (item.status === 'deleted') {
      return `Property '${parent}${item.key}' was removed`;
    }
    if (item.status === 'changed') {
      return `Property '${parent}${item.key}' was updated. From ${stringifyValue(item.value1)} to ${stringifyValue(item.value2)}`;
    }
    if (item.status === 'added') {
      return `Property '${parent}${item.key}' was added with value: ${stringifyValue(item.value1)}`;
    }
    return '';
  });
  return `${result.filter((n) => n).join('\n')}`;
};
export default plain;
