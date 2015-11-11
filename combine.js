var inquirer = require("inquirer");
 
var questions = [
    {
      type: 'input',
      name: 'keywordList1',
      message: 'Please enter the list of keywords for the first category. Separate keywords with a space then press enter.'
    },
    {
      type: 'input',
      name: 'keywordList2',
      message: 'Please enter the list of keywords for the second category. Separate keywords with a space then press enter.'
    },
    {
      type: 'input',
      name: 'keywordList3',
      message: 'Please enter the list of keywords for the third category. Separate keywords with a space then press enter.'
    }
  ];



inquirer.prompt(questions, generateKeywords);


function generateKeywords(responses) {

  //instantiate variables to use later
  var longKeywords = [];
  var pairs = [];
  var multiDimArr = [];

  //transform user input into arrays according to category number
  var categoryOne = responses.keywordList1.split(" ");
  var categoryTwo = responses.keywordList2.split(" ");
  var categoryThree = responses.keywordList3.split(" ");

  //check whether or not there are keywords for each category
  //we will remove empty strings when generating keywords
  function checkIfEmpty(arr){
    if (arr[0] === ""){
      return;
    }else {
      var filtered = arr.filter(function(el){
        return el !== "";  //ensure no elements are empty strings
      });
      multiDimArr.push(filtered)
    }
  };

  checkIfEmpty(categoryOne);
  checkIfEmpty(categoryTwo);
  checkIfEmpty(categoryThree);

  //store all individual keywords in one large array
  var allKeywords = [].concat.apply([], multiDimArr);


  //get all two keyword pairs for given input

  //recursive function generates the pairs within the array of arrays
  function getPairs(arr) {
    if (arr.length < 2) { return []; }
    var curr = arr[0],
      remaining  = arr.slice(1),
      tempPairs = remaining.map(function (el) { return [curr, el]; });
      return tempPairs.concat(getPairs(remaining));
    };

  var arrPairs = getPairs(multiDimArr);

  //get full set of two keyword pairs by looping through paired arrays
  arrPairs.forEach(function(el){
    for (var i = 0; i < el[0].length; i++){
      for (var j = 0; j < el[1].length; j++){
        pairs.push(el[0][i] + " " + el[1][j]);
      }
    }  
  });

  //array methods to get all combinations with exactly one keyword per category
  //only run this if all three categories contain input
  if (multiDimArr.length > 2){
    multiDimArr[0].forEach(function(el){
      multiDimArr[1].forEach(function(el2){
        multiDimArr[2].forEach(function(el3){
          longKeywords.push(el + " " + el2 + " " + el3);
        })
      })
    })
  };

  //get all resulting keywords by concatenating the pairs, longest combinations
  //and full list of original keywords
  var resultKeywords = longKeywords.concat(pairs, allKeywords);

  //log this information out to the user
  console.log("Here are your keyword combinations", resultKeywords);

  //return object with information for testing
  return {
    resultKeywords: resultKeywords,
    allKeywords: allKeywords,
    pairs: pairs,
    multiDimArr: multiDimArr,
    longKeywords: longKeywords,
    categoryOne: categoryOne,
    categoryTwo: categoryTwo,
    categoryThree: categoryThree
  };

};



module.exports = {
  generateKeywords: generateKeywords
};


