import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  } if (formatName === 'plain') {
    return plain(data);
  }
  return `Error, wrong --format ${formatName}`;
};

export default formatter;
