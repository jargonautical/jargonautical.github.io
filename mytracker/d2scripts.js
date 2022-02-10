const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var apiKey = 'a43fee90ad014eb880cb591885a383c4'

console.log(apiKey);

//var xhr = new XMLHttpRequest();
//xhr.open("GET", "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/", true);
//xhr.open("GET", "https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009360795669/Stats/", true);
//xhr.open("GET", "https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009423934835/Stats/Activities/?mode=5", true);
var url = 'https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009423934835/Stats/Activities/?mode=5'
//url = 'https://jsonplaceholder.typicode.com/users'
fetch(url), {
  credentials: 'include',
  headers: {
    'Authorization': apiKey
  }
  .then(response => {
    return response.json();
  })
  .then(users => {
    console.log(users);
  });
