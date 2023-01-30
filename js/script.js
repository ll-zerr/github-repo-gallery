// profile information div
const profileOverview = document.querySelector(".overview");
const username = "ll-zerr";
// ul to display the list of repos
const listOfRepos = document.querySelector(".repo-list");
// section where all repo info will appear
const repoSection = document.querySelector(".repos");
// section where individual repo data will appear
const individualRepo = document.querySelector(".repo-data");

// fetch data from user profile
const getData = async function() {
  const res = await fetch (`https://api.github.com/users/${username}`);

    const data = await res.json();
    // console.log(data);
    displayData(data);
};

getData();

// display user information on the page
const displayData = function (data) {
  let profileInfo = document.createElement("div");
  profileInfo.classList.add("user-info");

  profileInfo.innerHTML =
  `<figure>
    <img alt="user avatar" src=${data.avatar_url}/>
   </figure>
   <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
   </div>`;
   profileOverview.append(profileInfo);
   getRepos();
};

// fetch user repos
const getRepos = async function () {
  const repoResult = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoResult.json();
    console.log(repoData);
    displayInfo(repoData);
};

// display info about repos
const displayInfo = function (repos) {
  for (let repo of repos) {
    let listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    listOfRepos.append(listItem);
  }
};

// event listener for individual repo
const repoList = listOfRepos.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    specificRepoInfo(repoName);
  }
});

// fetch specific repo information
const specificRepoInfo = async function (repoName) {
  const result = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await result.json();
    // console.log(repoInfo);
  const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
  const languages = [];
  for (let key in languageData) {
    // console.log(key);
    languages.push(key);
    // console.log(languages);
  }
  displaySpecificRepoInfo(repoInfo, languages);
};

// display specific repo information
const displaySpecificRepoInfo = function (repoInfo, languages) {
  individualRepo.innerHTML = "";
  const individualRepoDiv = document.createElement("div");
  individualRepoDiv.innerHTML =
  `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>`;
  individualRepo.append(individualRepoDiv);
  individualRepo.classList.remove("hide");
  repoSection.classList.add("hide");
};
