const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

const request = require('request');

var apiKey = 'a43fee90ad014eb880cb591885a383c4'

const HOST = 'http://www.bungie.net/Platform/Destiny2/';

		var baseRequest = request.defaults({headers: {'X-API-Key':apiKey}});

		app.get('/test',function(req,res) {
		  if (!err && response.statusCode < 400) {
		    baseRequest(HOST + '3/Account/4611686018476645284/Character/2305843009360795669/Stats/AggregateActivityStats/' + credentials.defaultUserName + '/',
			  function (err, response, body) {

			    var context = {};
				context.test = JSON.stringify(JSON.parse(body), null, 4);
				res.render('test', context);
		    });
		  }
		});
/*
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.bungie.net/Platform/Destiny/Manifest/InventoryItem/1274330687/", true);
xhr.setRequestHeader("X-API-Key", apiKey);

xhr.onreadystatechange = function(){
 if(this.readyState === 4 && this.status === 200){
  var json = JSON.parse(this.responseText);
  console.log(json);
  //console.log(json.Response.data.inventoryItem.itemName); //Gjallarhorn
 }
}

xhr.send();

/*
var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();
*/
