[![travis build](https://img.shields.io/travis/accraze/split-md.svg)](https://travis-ci.org/accraze/split-md)
[![version](https://img.shields.io/npm/v/split-md.svg)](https://www.npmjs.com/package/split-md)
[![license](https://img.shields.io/npm/l/split-md.svg)](https://www.npmjs.com/package/split-md)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# split-md

NodeJS CLI that splits a Markdown file into smaller files based on a given delimiter. It's basically `str.split(pattern)` for `.md` files.

## Install

```
$ npm install split-md
```

## Useage

To use the CLI, type `split-md` followed by it's args:
* readPath (path to larger .md file)
* pattern (string)
* cleanName (string): do you want to remove anything from the pattern?
* writePath (path to where smaller files should be created)
* limit (optionally limit the number of files created)

#### Example

```
$ split-md 'tests/testdata.md' '### v' '###' '' 10
```

In the above example we are reading in `tests/testdata.md`. Our delimiter is whenever we see a line start with the pattern `### v`. We want to use this line for our new markdown file's name, however we want to remove the `###` by setting it as the cleanName variable. Lastly, we are setting the `writePath` to our current working directory by giving an empty string as the last variable. Also note that we are setting our limit to only create 10 files before exiting.

## License:

[MIT](https://github.com/accraze/split-md/blob/master/LICENSE) License 2016-2018 © Andy Craze & contributors

