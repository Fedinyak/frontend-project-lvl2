import yaml from 'js-yaml';

const parsers = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  throw new Error(`Error, ${format} - wrong file extension`);
};

export default parsers;
