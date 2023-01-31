const profileOverview = document.querySelector(".overview");
const username = "ll-zerr";
const listOfRepos = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const individualRepo = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


const getData = async function() {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  displayData(data);
};

getData();


const displayData = function(data) {
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


const getRepos = async function() {
  const repoResult = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoResult.json();
  displayInfo(repoData);
};


const displayInfo = function(repos) {
  for (let repo of repos) {
    let listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    listOfRepos.append(listItem);
    filterInput.classList.remove("hide");
  }
};


const repoList = listOfRepos.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    specificRepoInfo(repoName);
  }
});


const specificRepoInfo = async function(repoName) {
  const result = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await result.json();
  const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
  const languageData = await fetchLanguages.json();
  const languages = [];
  for (let key in languageData) {
    languages.push(key);
  }
  displaySpecificRepoInfo(repoInfo, languages);
};


const displaySpecificRepoInfo = function(repoInfo, languages) {
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
  backButton.classList.remove("hide");
};


backButton.addEventListener("click", function() {
  repoSection.classList.remove("hide");
  individualRepo.classList.add("hide");
  backButton.classList.add("hide");
});


filterInput.addEventListener("input", function(e) {
  const input = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerCaseInput = input.toLowerCase();
  for (const repo of repos) {
    const lowerCaseText = repo.innerText.toLowerCase();
    if (lowerCaseText.includes(lowerCaseInput)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    };
  };
});
