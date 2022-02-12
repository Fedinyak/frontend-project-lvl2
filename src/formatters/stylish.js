import _ from 'lodash';

const getTab = (count, tab = '  ') => tab.repeat(count);

const stringifyObject = (data, depth = 1) => {
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => {
    if (_.isObject(value)) {
      return `${getTab(depth + 2)}${key}: ${stringifyObject(value, depth + 2)}`;
    }
    return `${getTab(depth + 2)}${key}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${getTab(depth)}}`;
};

const stringifyValue = (value, depth) => {
  if (_.isObject(value)) {
    return `${stringifyObject(value, depth + 1)}`;
  }
  return `${value}`;
};

const stylish = (data, depth = 1) => {
  const tab = getTab(depth);
  const result = data.map(({
    key, status, value1, value2, children,
  }) => {
    if (status === 'nest') {
      return `${tab}  ${key}: ${stylish(children, depth + 2)}`;
    } if (status === 'deleted') {
      return `${tab}- ${key}: ${stringifyValue(value1, depth)}`;
    } if (status === 'unchanged') {
      return `${tab}  ${key}: ${stringifyValue(value1, depth)}`;
    } if (status === 'changed') {
      return `${tab}- ${key}: ${stringifyValue(value1, depth)}\n${tab}+ ${key}: ${stringifyValue(value2, depth)}`;
    }
    return `${tab}+ ${key}: ${stringifyValue(value1, depth)}`;
  });
  return `{\n${result.join('\n')}\n${getTab(depth - 1)}}`;
};

export default stylish;
