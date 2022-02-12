import _ from 'lodash';

const getParent = (parent, str = '') => {
  if (parent === '') {
    return str;
  }
  let result = str;
  result += parent;
  return result;
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
  const result = data.map(({
    key, status, value1, value2, children,
  }) => {
    if (status === 'nest') {
      return `${plain(children, `${acc + key}.`)}`;
    } if (status === 'deleted') {
      return `Property '${parent}${key}' was removed`;
    } if (status === 'changed') {
      return `Property '${parent}${key}' was updated. From ${stringifyValue(value1)} to ${stringifyValue(value2)}`;
    } if (status === 'added') {
      return `Property '${parent}${key}' was added with value: ${stringifyValue(value1)}`;
    }
    return '';
  });
  return `${result.filter((n) => n).join('\n')}`;
};

export default plain;
