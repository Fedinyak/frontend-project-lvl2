import * as fs from 'fs';
import * as path from 'path';
import { cwd } from 'process';

const readFile = (filePath) => fs.readFileSync(path.resolve(cwd(), filePath), 'utf8');

export default readFile;
