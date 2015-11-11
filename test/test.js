var expect = require('chai').expect;
var combine = require('../combine.js');
var _ = require('lodash');


describe('Generate Combined Keywords', function() {

  var results;
  var input;
  var output;
  var expectedOutput;

  beforeEach(function() {

    input = { 
      keywordList1: 'NYC',
      keywordList2: 'sushi burgers',
      keywordList3: 'party'
    };

    expectedOutput = ['NYC sushi party',
    'NYC burgers party',
    'NYC sushi',
    'NYC burgers',
    'NYC party',
    'sushi party',
    'burgers party',
    'NYC',
    'sushi',
    'burgers',
    'party'];

    output = combine.generateKeywords(input);
  });

  it('transforms strings of user input into arrays', function() {
    expect(output.categoryOne).to.be.an('array');
    expect(output.categoryOne).to.eql(['NYC']);
  });

  it('creates a two dimensional array with each category as a sub array', function(){
    expect(output.multiDimArr).to.have.length(3);
  });

  it('provides the expected output for the given input', function() {
    expect(output.resultKeywords).to.eql(expectedOutput);
  });

});

describe('Addtional Tests', function(){

  it('removes empty category arrays from keyword combo generation', function(){

    var incompleteInput = {
      keywordList1: 'NYC',
      keywordList2: 'sushi burgers',
      keywordList3: ''
    };

    expect(combine.generateKeywords(incompleteInput).multiDimArr).to.have.length(2);
    expect(combine.generateKeywords(incompleteInput).allKeywords).to.eql(['NYC', 'sushi', 'burgers']);
  });

  it('logs an empty array if all categories are left empty', function(){

    var emptyInput = {
      keywordList1: '',
      keywordList2: '',
      keywordList3: ''
    };

    expect(combine.generateKeywords(emptyInput).multiDimArr).to.have.length(0);
    expect(combine.generateKeywords(emptyInput).resultKeywords).to.eql([]);
  });


  it('ensures that all two keyword pairs are unique', function(){

    var multiWords = {
      keywordList1: 'hello goodbye',
      keywordList2: 'sushi burgers',
      keywordList3: 'happy sad'
    };

    var originalPairs = combine.generateKeywords(multiWords).pairs;
    expect(_.uniq(originalPairs)).to.eql(originalPairs);
    expect(originalPairs).to.have.length(12);
  });

  it('ensures that all three word combos are unique', function(){
      
    var multiWords = {
      keywordList1: 'hello goodbye',
      keywordList2: 'sushi burgers',
      keywordList3: 'happy sad'
    };

    var originalGroups = combine.generateKeywords(multiWords).longKeywords;
    expect(_.uniq(originalGroups)).to.eql(originalGroups);
    expect(originalGroups).to.have.length(8);
  });

  it('does not repeat any keyword combinations in the final output logged to user', function(){
      
    var multiWords = {
      keywordList1: 'hello goodbye',
      keywordList2: 'sushi burgers',
      keywordList3: 'happy sad'
    };

    var loggedKeywords = combine.generateKeywords(multiWords).resultKeywords;
    expect(_.uniq(loggedKeywords)).to.eql(loggedKeywords);
    expect(loggedKeywords).to.have.length(26);
  });

});
