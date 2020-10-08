var userFormEl      = document.querySelector("#user-form");
var nameInputEl     = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm  = document.querySelector("#repo-search-term");

/*6.1.5 The then() method returns a Promise. It takes up to two arguments: 
callback functions for the success and failure cases of the Promise.*/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
/*Notice how the response object in your fetch() logic has a method called json(). 
This method formats the response as JSON. But sometimes a resource may return non-
JSON data, and in those cases, a different method, like text(), would be used.*/
//js inside function parenthesis:
//https://www.codecademy.com/forum_questions/54bfd1c351b887e95c0017f3
var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        //request was successful
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        }
        //if request was unsuccessful
        else {
            alert("Error: " + response.statusText);
        }
    })
    /*6.2.6 Notice that last part, the .catch() method? That's the Fetch API's 
    way of handling network errors. When we use fetch() to create a request, the 
    request might go one of two ways: the request may find its destination URL 
    and attempt to get the data in question, which would get returned into the 
    .then() method; or if the request fails, that error will be sent to the 
    .catch() method.*/
    .catch(function(error) {
        //notice this '.catch()' is getting chained onto the end of the '.then()'
        alert("Unable to connect to GitHub");
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    /*update the formSubmitHandler() function to get the value of the 
    form <input> element and send it over to getUserRepos()*/
    //get value from the input element - searching for "term"
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        //checks if there's a value in the username
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
    //console.log(event);
};


/*6.2.5 Let's start by creating a new function called displayRepos(). 
This function will accept both the array of repository data and 
the term we searched for as parameters.*/
var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
        //places text in the repoContainerEl
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    //console.log(repos);
    //console.log(searchTerm);
    
    /*6.2.5 When working with an app that displays data based on user input, 
    we should always be sure to clear out the old content before 
    displaying new content.*/
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //6.2.5 displaying repository data to the page
    /*6.4.3 Find the displayRepos() function and target the for loop that's dynamically 
    creating HTML elements from the GitHub API response. Change the expression that 
    creates a <div> to create an <a> element instead. We'll also need to add an 
    expression to create a new href attribute.*/
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name------------------------------------------break this down
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a link for each repo
        var repoEl = document.createElement("a");

        //list classes for created div container
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //set href for each anchor element
        /*6.4.3 Notice that the path to the single-repo.html page in the newly created 
        href attributes is a relative path from the index.html page, not homepage.js, 
        where the element is created. From the browser's perspective, although 
        dynamically created, these HTML elements become part of the markup—as 
        shown in the page source of the rendered page. So when you create links to 
        HTML pages in JavaScript, make sure the paths are relative to the HTML pages, 
        not the JavaScript file.*/
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create a span element to hold repository name 
        //(to go inside div with appendChild)
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container (container we made with our div element)
        repoEl.appendChild(titleEl);

        //create a status element to hold issue status
        //(also to go inside div with appendChild)
        var statusEl = document.createElement("span");

        //list classes for created span
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        //(icons from Font Awesome)
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //append container to the dom
        //(repoContainerEl variable named at the top of the page)
        repoContainerEl.appendChild(repoEl);

        /*6.2.5 How does this work? In the for loop, we're taking each repository 
        (repos[i]) and writing some of its data to the page. First we format 
        the appearance of the name and repository name. Next we create and 
        style a <div> element. Then we create a <span> to hold the formatted 
        repository name. We add that to the <div> and add the entire <div> 
        to the container we created earlier.*/
    }
};

/*add event listener takes button type="submit", 
and upon submit executes the function*/
userFormEl.addEventListener("submit", formSubmitHandler);