import { test, expect } from '@jest/globals';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const JsonFile1 = getFixturePath('file1.json');
const JsonFile2 = getFixturePath('file2.json');

const YamlFile1 = getFixturePath('file1.json');
const YamlFile2 = getFixturePath('file2.json');

const difFiles = '{\n  - follow: false,\n    host: hexlet.io,\n  - proxy: 123.234.53.22,\n  - timeout: 50,\n  + timeout: 20,\n  + verbose: true\n}';

test('genDiffJson', () => {
  expect(genDiff(JsonFile1, JsonFile2)).toEqual(difFiles);
});

test('genDiffYml', () => {
  expect(genDiff(YamlFile1, YamlFile2)).toEqual(difFiles);
});
