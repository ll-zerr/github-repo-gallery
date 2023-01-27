// profile information div
const profileOverview = document.querySelector(".overview");
const username = "ll-zerr";
const listOfRepos = document.querySelector(".repo-list");

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
   </div>`
   profileOverview.append(profileInfo);
   getRepos();
};

// fetch user repos
const getRepos = async function () {
  const repoResult = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoResult.json();
    console.log(repoData);
    repoInfo(repoData);
};

// display info about repos
const repoInfo = function (repos) {
  for (let repo of repos) {
    let listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    listOfRepos.append(listItem);
  }
};
