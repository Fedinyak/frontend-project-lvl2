import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';

const parsers = (filePath) => {
  const file = fs.readFileSync(path.resolve(cwd(), filePath), 'utf8');
  const format = path.extname(filePath);

  if (format === '.json') {
    return JSON.parse(file);
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load(file);
  }

  return `Error, ${format} - wrong file extension`;
};

export default parsers;
