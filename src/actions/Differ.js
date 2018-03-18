var gitDiff = require( 'git-diff' );
var readFileGo = require( 'readfile-go' );

export default function Differ() {
  //we'll get the master branch
  //and the target branch
  // var masterBranch = readFileGo( __dirname + '/masterBranch.txt' );
  // var targetBranch = readFileGo( __dirname + '/targetBranch.txt' );
  var masterBranch = "This is version one";
  var targetBranch = "This is version two";

  var options = {
    color: true,
    noHeaders: true,
    wordDiff: true
  };

  var diff = gitDiff( masterBranch, targetBranch, options );
  return diff;
};
