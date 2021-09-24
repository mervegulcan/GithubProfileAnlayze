const button = document.querySelector(".header button");
const repoInfo = document.querySelectorAll("#repo-info p strong");
const name = document.querySelector("#name").innerHTML;
const userInfo = document.querySelector("#user-info");
const languageList = document.querySelector("#language");


const getUserData = async (username) =>
{

    const url ="https://api.github.com/users/";
    const name = document.getElementById("name");
    const photo = document.getElementById("photo");
    const githubUserName = document.getElementById("username");

    await fetch(url + username)
    .then((response) => response.json())
    .then((user) =>{
        repoInfo[0].innerHTML = user.public_repos;
        photo.src= user.avatar_url;       
        githubUserName.innerHTML ="@" + user.login;
        name.innerHTML =user.name;       
        
    })
    .catch((err) =>{
        throw new Error(err);
    });


};

//apiden çekilen kullanıcının kullandığu dil bilgilerini alıp hesaplandığı kısım
const getUserRepo = async (username) => {
    const repoRequest = "/repos?per_page=100";
    const url = "https://api.github.com/users/";
    const repoInfo = document.querySelectorAll("#repo-info p  strong");
    let language = {};
    let totalSize = 0;
  
    await fetch(url + username + repoRequest)
      .then((data) => data.json())
      .then((repos) => {
        const languageList = document.querySelector("#language");       
        
  
        const userLanguages = repos.map((repo) => repo.language);
  
        const totalItem = userLanguages.length;
  
        const uniqueLanguages = [...new Set(userLanguages)];
  
        uniqueLanguages.forEach((currLanguage) => 
        {
            const numLanguage = userLanguages.filter(
            (language) => language === currLanguage
          );
          
          if (currLanguage !== null) {
            const languageDiv = languageList.appendChild(
              document.createElement("div")
            );
            const languageName = languageDiv.appendChild(
              document.createElement("p")
            );
  
            const languagePercentage = languageDiv.appendChild(
              document.createElement("strong")
            );
            const lanPercentage =
              ((numLanguage.length * 100) / totalItem).toFixed(2) + "%";
  
            languageName.innerHTML = currLanguage;
            languagePercentage.innerHTML = lanPercentage;
          } 
          
        });
      })
      .catch((err) => {
        console.log(err.message);
        console.log("catch trigger");
        errorHandler("Not Found");
      });
    repoInfo[1].innerHTML = (totalSize / 1000).toFixed(2) + " MB";
};


//input alanına girilen değeri butonla gönderilmesi
function handleInput(event){
     const input = document.querySelector(".header .inputUserName");


     let inputValue = input.value;   

     if(inputValue.trim().length === 0){
         return;
     }

    input.value = event.target.value;    
    getUserData(inputValue),getUserRepo(inputValue);

}

//Buttona tıklanınca alacağı  fonksiyonu tanımlıyoruz
button.addEventListener("click", handleInput);





