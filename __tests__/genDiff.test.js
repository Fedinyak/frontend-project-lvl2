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

const YamlFile1 = getFixturePath('file1.yml');
const YamlFile2 = getFixturePath('file2.yaml');

const result = fs.readFileSync(getFixturePath('result.txt'), 'utf8');
const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf8');
const resultJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf8');

const formatterStylish = 'stylish';
const formatterPlain = 'plain';
const formatterJson = 'json';

test.each([
  [JsonFile1, JsonFile2, formatterStylish, result],
  [YamlFile1, YamlFile2, formatterStylish, result],
  [JsonFile1, JsonFile2, formatterPlain, resultPlain],
  [YamlFile1, YamlFile2, formatterPlain, resultPlain],
  [JsonFile1, JsonFile2, formatterJson, resultJson],
  [YamlFile1, YamlFile2, formatterJson, resultJson],
])('genDiff %s %s %s', (file1, file2, formatter, expectedResult) => {
  const diff = genDiff(file1, file2, formatter);
  expect(diff).toEqual(expectedResult);
});
