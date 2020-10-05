/*6.1.5 The then() method returns a Promise. It takes up to two arguments: 
callback functions for the success and failure cases of the Promise.*/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
/*Notice how the response object in your fetch() logic has a method called json(). 
This method formats the response as JSON. But sometimes a resource may return non-
JSON data, and in those cases, a different method, like text(), would be used.*/
var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
}
//enter usernames with quotes inside parenthesis
getUserRepos();