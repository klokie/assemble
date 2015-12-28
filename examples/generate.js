var async = require('async');
var through = require('through2');
var assemble = require('../');
var app = assemble();

app.engine('txt', require('engine-handlebars'));
var Scaffold = require('scaffold');

var one = new Scaffold({
  cwd: 'test/fixtures/scaffolds',
  destBase: 'test/actual/one',
  files: [
    {src: '*.txt', dest: 'a'},
    {src: '*.txt', dest: 'b'},
    {src: '*.txt', dest: 'c'},
    {src: '*.md', dest: 'md', data: {name: 'Brian'}},
  ]
});

var two = new Scaffold({
  cwd: 'test/fixtures/scaffolds',
  destBase: 'test/actual/two',
  files: [
    {src: '*.txt', dest: 'a'},
    {src: '*.txt', dest: 'b'},
    {src: '*.txt', dest: 'c'},
    {src: '*.md', dest: 'md', data: {name: 'Jon'}},
  ]
});


app.task('one', function (cb) {
  app.generate(one, cb);
});

app.task('two', function (cb) {
  app.generate(two, cb);
});


app.task('default', ['one', 'two']);
app.run('default', function (err) {
  if (err) console.error(err);
});