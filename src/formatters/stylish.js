import _ from 'lodash';

const getTab = (count, tab = '  ') => tab.repeat(count);

const stringifyValue = (value, depth) => {
  if (_.isObject(value)) {
    const entries = Object.entries(value);
    const result = entries.map(([key, valueObj]) => `${getTab(depth + 2)}${key}: ${stringifyValue(valueObj, depth + 2)}`);
    return `{\n${result.join('\n')}\n${getTab(depth)}}`;
  }
  return `${value}`;
};

const stylish = (data, depth = 1) => {
  const tab = getTab(depth);
  const result = data.map((item) => {
    if (item.status === 'nest') {
      return `${tab}  ${item.key}: ${stylish(item.children, depth + 2)}`;
    }
    if (item.status === 'deleted') {
      return `${tab}- ${item.key}: ${stringifyValue(item.value1, depth + 1)}`;
    }
    if (item.status === 'unchanged') {
      return `${tab}  ${item.key}: ${stringifyValue(item.value1, depth + 1)}`;
    }
    if (item.status === 'changed') {
      return `${tab}- ${item.key}: ${stringifyValue(item.value1, depth + 1)}\n${tab}+ ${item.key}: ${stringifyValue(item.value2, depth + 1)}`;
    }
    return `${tab}+ ${item.key}: ${stringifyValue(item.value1, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n${getTab(depth - 1)}}`;
};

export default stylish;
