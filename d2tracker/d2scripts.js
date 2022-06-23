const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var apiKey = 'a43fee90ad014eb880cb591885a383c4'

$.ajax({
  url: "https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009423934835/Stats/Activities/?mode=5",
  headers: {
    "X-API-Key": apiKey
  }
}).done(function(json){
  //console.log(json.Response.activities[0]); //data
  var data = json.Response.activities[0].values;
  console.log(data)
  var keys = Object.keys(data);
  keys.forEach(function(key) {
    var item = data[key];
    // access the `key` variable and `item` variable
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h1 = document.createElement('h1');
    h1.textContent = key;
    console.log(key);

    const p = document.createElement('p');
    p.textContent = `${item.basic.value}...`;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);
  }
)
})
