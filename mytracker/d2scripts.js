const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var apiKey = 'a43fee90ad014eb880cb591885a383c4'
console.log(apiKey);

$.ajax({
  url: "https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009360795669/Stats/?daystart=2020-01-01&dayend=2020-01-31&mode=63&periodType=1/",
  //url: "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/",
  headers: {
    "X-API-Key": apiKey
  }
}).done(function(json){
  //console.log(json.Response.data.inventoryItem.itemName); //Gjallarhorn
  console.log('is this even working?');
  //console.log(json.Response); //data
});
