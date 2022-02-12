import _ from 'lodash';

const getTab = (count, tab = '') => {
  if (count === '') {
    return tab;
  }
  let result = tab;
  result += count;
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

const plain = (data, depth = '') => {
  const tab = getTab(depth);
  const result = data.map(({
    key, status, value1, value2, children,
  }) => {
    if (status === 'nest') {
      return `${plain(children, `${depth + key}.`)}`;
    } if (status === 'deleted') {
      return `Property '${tab}${key}' was removed`;
    } if (status === 'changed') {
      return `Property '${tab}${key}' was updated. From ${stringifyValue(value1)} to ${stringifyValue(value2)}`;
    } if (status === 'added') {
      return `Property '${tab}${key}' was added with value: ${stringifyValue(value1)}`;
    }
    return '';
  });
  return `${result.filter((n) => n).join('\n')}`;
};

export default plain;
