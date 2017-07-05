var request = require('request');
var fs = require('fs')
console.log('Welcome to the GitHub Avatar Downloader!');


var GITHUB_USER = "namgoo";
var GITHUB_TOKEN = "289c98ed3648e28ae207f1529d5e118d9f727419";

function getRepoContributors(repoOwner, repoName, cb) {
var repoOwner = process.argv[2]
var repoName = process.argv[3]

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
var options = {
  url: requestURL,
  headers: {
    'User-Agent': 'request'
  }
};
  console.log(requestURL);
  var uniqueRL = ""
  var newBody = {}
  request.get(options, function (error, response, body) {
    newBody = JSON.parse(body)
    cb(error, newBody);

  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)              // Note 1
       .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("TypeOf:", typeof result);
  var login = ""
  var avatar__url = ""
  for (i = 0; i < result.length; i++ ) {
    login = "avatars/"+result[i].login+".jpg"
    avatar__url  = result[i].avatar_url
    console.log(avatar__url)
    downloadImageByURL(avatar__url,login);
  }
})


// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")


// # 2 Main ways to call 'get'
// request.get(url)
// .on(...)

// request.get(url, function (error, response, body))