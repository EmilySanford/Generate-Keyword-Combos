# Combined-Keywords
##### A simple Node app that allows users to generate all combinations of keywords from up to three categories

This keyword combining app takes input for up to three categories of keywords and returns a list of all possible keyword combinations without repetition or permutations. 
For Example, if we take the following input:

category 1 -> "cat"

category 2 -> "happy", "sad"

category 3 -> "NYC"

We will recieve the following output:

'cat happy NYC', 'cat sad NYC', 'cat happy', 'cat sad', 'cat NYC', 'happy NYC', 'sad NYC', 'cat', 'happy', 'sad', 'NYC'

Empty strings will be ignored when generating combined keywords. 
This app was built with NodeJS, using inquirer for command line interaction and mocha and chai for testing. 

# Getting Started

Follow these steps to use this application:

1. Download and navigate into the project folder
2. npm install
3. From the command line, run "node combine"
4. You will be prompted to enter keywords for three categories. Leave spaces between keywords and hit enter to move onto the next category. Simply hit enter to skip a category. As soon as you have entered all keywords the final list of combined phrases will be logged in the terminal.
5. To run automated tests, enter "npm test"



