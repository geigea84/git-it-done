var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    console.log(repo);

    /*6.3.4 Remember that fetch() is asynchronous. We'll 
    have to use its Promise-based syntax to actually access 
    the data contained in the response.*/
    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to dom function
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
        }
        /*Notice that we are checking the value of response.ok, 
        which indicates a successful request.*/
    });
};

/*In the displayIssues() function, loop over the response data 
and create an <a> element for each issue*/
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        /*6.3.5 Again, this looks like what we did with repo data in homepage.js. 
        The biggest difference is the data we're working with. Issue objects 
        have an html_url property, which links to the full issue on GitHub. 
        We also added a target="_blank" attribute to each <a> element, to open 
        the link in a new tab instead of replacing the current webpage.*/
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        
        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);

        //append to html (see var at top of page)
        issueContainerEl.appendChild(issueEl);
    }
};

//username/repo name
getRepoIssues("facebook/react");

/*6.3.4 Using the endpoint listed in the documentation, we can 
format the URL as https://api.github.com/repos/<repo>/issues, 
where <repo> encompasses the username and repo name.*/

/*6.3.4 We also have the option to append ?direction=asc to the 
end of the query URL to specify the sort order. By default, GitHub 
returns request results in descending order by their created date, 
meaning that we see newer issues first. The ?direction=asc option 
reverses order to return older issues first.*/