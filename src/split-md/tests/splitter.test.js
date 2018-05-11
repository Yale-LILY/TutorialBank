var expect = require('chai').expect
var splitter = require('../src/splitter.js')
var shell = require('shelljs')

var readPath = 'tests/testdata.md',
    pattern = '### v',
    cleanName = '###',
    writePath = 'tests/tmp/';

describe('splitter', function () {
  it('should split markdown file into smaller files', function (done) {
    shell.mkdir('-p', 'tests/tmp')
    splitter(readPath, pattern, cleanName, writePath);
    var filez = shell.ls('tests/tmp/*.md')
    console.log(filez)
    expect(filez).to.contain('tests/tmp/v0.0.1.md');
    expect(filez).to.contain('tests/tmp/v0.0.2.md');
    expect(filez).to.contain('tests/tmp/v0.0.3.md');
    shell.rm('-rf', 'tests/tmp/')
    done();
  });
  it('should throw error when given invalid file to read', function (done) {
    readPath = 'blahblahblah';
    expect(splitter.bind(splitter, readPath, pattern, cleanName, writePath)).to.throw(Error);
    done();
  });
  it('should exist', function (done) {
    expect(splitter).to.exist;
    done();
  });

});
