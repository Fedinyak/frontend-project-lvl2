import { test, expect } from '@jest/globals';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const JsonFile1 = getFixturePath('file1.json');
const JsonFile2 = getFixturePath('file2.json');

const YamlFile1 = getFixturePath('file1.json');
const YamlFile2 = getFixturePath('file2.json');

const result = fs.readFileSync(getFixturePath('result.txt'), 'utf8');

test('genDiffJson', () => {
  expect(genDiff(JsonFile1, JsonFile2)).toEqual(result);
});

test('genDiffYml', () => {
  expect(genDiff(YamlFile1, YamlFile2)).toEqual(result);
});
