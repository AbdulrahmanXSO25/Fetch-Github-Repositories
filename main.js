let input = document.getElementById('input');
let reposDiv = document.querySelector('.repos');

function getRepos () {
    if (input.value == "")
    {
        document.querySelector('.repos-container h3').innerHTML = "Please Enter A Github Username";
        document.querySelector('.repos-container h3').className = "shake-h3";
        reposDiv.innerHTML = "";
    }

    else
    {
        if (reposDiv.innerHTML != "")
        {
        
        reposDiv.innerHTML = "";

        showData(input.value);

        input.value = "";
        
        }
        else
        {
    

        showData(input.value);

        input.value = "";
        }
    }
}

function showData(userName)
{
    var i = 1;
    
    fetch(`https://api.github.com/users/${userName}`)
    
    .then((response) => response.json())
    
    .then((data) =>document.querySelector('.repos-container h3').innerHTML = `Repositeries - ${data.login}`);

    fetch(`https://api.github.com/users/${userName}/repos`)
        
        .then((response) => response.json())
        
        .then((repos) =>
        {

            repos.forEach(repo => {
                repoDiv = document.createElement('div');
                repoDiv.className = "repo";
                reposDiv.appendChild(repoDiv);
                repoDivTitle = document.createElement('a');
                repoDivTitle.className = "title";
                repoDiv.appendChild(repoDivTitle);
                repoDivTitle.innerHTML = `${i++} ${repo.name}`;
                repoDivTitle.href = `https://github.com/${userName}/${repo.name}`;
                repoDivInfo = document.createElement('div');
                repoDivInfo.className = "info";
                repoDiv.appendChild(repoDivInfo);
                if (repo.fork)
                {   
                let forkedSpan = document.createElement('span');
                forkedSpan.className = "forked";
                forkedSpan.innerHTML = "FORKED";
                repoDivInfo.appendChild(forkedSpan);
                }
                repoStars = document.createElement('span');
                repoStars.className = "stars";
                repoStars.innerHTML = `${repo.stargazers_count}  `;
                repoDivInfo.appendChild(repoStars);
                repoStarsIcon = document.createElement('i');
                repoStarsIcon.className = "fa-solid fa-star";
                repoStars.appendChild(repoStarsIcon);   
                repoVisit = document.createElement('a');
                repoVisit.className = "visit";
                repoDivInfo.appendChild(repoVisit);
                repoVisit.innerHTML = "Visit";
                repoVisit.href = `https://github.com/${userName}/${repo.name}`;
            });
        });
}