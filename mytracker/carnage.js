const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var apiKey = 'a43fee90ad014eb880cb591885a383c4'

function displayPayload(response) {
  var report = response.Response.entries;
  var keys = Object.keys(report);
  //console.log(keys);
  keys.forEach(function(key) {
    var charId = report[key].characterId;
    var  pname = report[key].player.destinyUserInfo.displayName;
    console.log('item', charId, pname);
    // access the `key` variable and `item` variable
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h1 = document.createElement('h1');
    h1.textContent = pname;
    //console.log(key);

    const p1 = document.createElement('p');
    p1.textContent = `character id is ${charId}`;

    const p2 = document.createElement('p');
    p2.textContent = `player name is ${pname}`;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p1);
    card.appendChild(p2);
  })
}

function instanceCall() {
  return $.ajax({
    url: "https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009423934835/Stats/Activities/?mode=5",
    type: 'GET',
    dataType: 'json',
    timeout: 3000,
    headers: {"X-API-Key": apiKey}
  });
}

function carnageCall(data) {
  // Variables created from response
  //var pvpMode = data.mode;
  var instanceId = data.Response.activities[0].activityDetails.instanceId;

  // Using variables for another call
  return $.ajax({
    url: "https://www.bungie.net/platform/Destiny2/Stats/PostGameCarnageReport/" + instanceId + "/",
    type: 'GET',
    dataType: 'json',
    timeout: 3000,
    headers: {"X-API-Key": apiKey}
  });
}

$(document).ready(function() {
  instanceCall()
    .done(function(data) {
      carnageCall(data)
        .done(function(response) {
          displayPayload(response);
          console.log(response);

        }).fail(function() {
          alert("carnageCall blew it :(");
        });
    }).fail(function() {
      alert("instanceCall blew it :(");
    });
});
