import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  } if (formatName === 'plain') {
    return plain(data);
  } if (formatName === 'json') {
    return json(data);
  }
  throw new Error(`Error, wrong --format ${formatName}`);
};

export default formatter;
