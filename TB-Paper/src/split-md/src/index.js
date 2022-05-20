#!/usr/bin/env node
var cli = require('cli')
var splitter = require('./splitter')

console.log("in the index \n\n")
splitter(cli.args[0],cli.args[1],cli.args[2],cli.args[3],cli.args[4])
