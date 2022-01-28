import genDiff from '../src/genDiff.js';

const file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const file2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const difFiles = '{  - follow: false    host: hexlet.io  - proxy: 123.234.53.22  - timeout: 50  + timeout: 20  + verbose: true}';

test('genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(difFiles);
});
