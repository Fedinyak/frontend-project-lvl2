import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';

const parsers = (filePath) => {
  const file = fs.readFileSync(path.resolve(cwd(), filePath), 'utf8');
  const format = path.extname(filePath);
  let result;

  if (format === '.json') {
    result = JSON.parse(file);
  } if (format === '.yml' || format === '.yaml') {
    result = yaml.load(file);
  }

  return result;
};

export default parsers;
