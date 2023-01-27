// profile information div
const profileOverview = document.querySelector(".overview");
const username = "ll-zerr";

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
    <img alt="user avatar" src=${'https://avatars.githubusercontent.com/u/103609331?v=4'}/>
   </figure>
   <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
   </div>`
   profileOverview.append(profileInfo);
};
