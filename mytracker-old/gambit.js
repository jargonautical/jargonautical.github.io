const app = document.getElementById('root');

const logo = document.createElement('img');
//logo.src = 'logo.png';
logo.src = '../assets/Jargonautical_web_icon.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var apiKey = 'a43fee90ad014eb880cb591885a383c4'

function displayPayload(response) {
  var report = response.Response.entries;
  var keys = Object.keys(report);
  keys.forEach(function(key) {
    //console.log(report);
    let charId = report[key].characterId;
    let pname = report[key].player.destinyUserInfo.displayName;
    let memid = report[key].player.destinyUserInfo.membershipId;
    let platform = report[key].player.destinyUserInfo.membershipType;
    let matchKills = report[key].values.kills.basic.displayValue;
    let matchKd = report[key].values.killsDeathsRatio.basic.displayValue;
    let matchPrec = report[key].extended.values.precisionKills.basic.displayValue;
    let matchGrenade = report[key].extended.values.weaponKillsGrenade.basic.displayValue;
    let matchMelee = report[key].extended.values.weaponKillsMelee.basic.displayValue;
    let matchSuper = report[key].extended.values.weaponKillsSuper.basic.displayValue;
    let winVal = report[key].values.standing.basic.value * 100;
    // TODO get this match best weapon name and type
    // TODO figure out how to do arrows for stats better/worse than all time
    // checking we are returning each player
    //console.log('item', pname);
    // TODO get player displayName
    // TODO get platform enum, maybe add logos?
    // access each player all time PvP stats
    var allTime = allTimeCall(platform, memid, charId).done(function(response) {
      //console.log(response.Response.allPvECompetitive);
      let foo = response.Response.allPvECompetitive.allTime;
      console.log(foo);
      let highScore = foo.bestSingleGameKills.basic.displayValue;
      let kills = foo.kills.pga.displayValue;
      let bestWeapon = foo.weaponBestType.basic.displayValue;
      //let elo = foo.combatRating.basic.displayValue;
      let invaderKills = foo.invaderKills.basic.displayValue;
      let invasionKills = foo.invasionKills.basic.displayValue;
      let kd = foo.killsDeathsRatio.basic.displayValue;
      let winLossRatio = foo.winLossRatio.basic.displayValue;
      let prec = foo.precisionKills.pga.displayValue;
      // card elements current info
      const s2 = document.createElement('h2');
      s2.textContent = 'This match stats';
      // card elements comparison
      const s3 = document.createElement('h2');
      s3.textContent = 'This match vs all-time stats';

      const c1 = document.createElement('p');
      c1.textContent = `Kills this match: ${matchKills} vs all time pga ${kills}`;

      const c2 = document.createElement('p');
      c2.textContent = `Precision kills this match: ${matchPrec} vs all time pga ${prec}`;

      const c3 = document.createElement('p');
      c3.textContent = `K/D this match: ${matchKd} vs all time ${kd}`;

      const p2 = document.createElement('p');
      p2.textContent = `Invasion kills: ${invasionKills}`;

      const p4 = document.createElement('p');
      p4.textContent =  `Invaders brought down: ${invaderKills}`;

      // best weapon all time
      const p3 = document.createElement('p');
      p3.textContent = `All time best weapon: ${bestWeapon}`;

      /*
      const c1 = document.createElement('p');
      c1.textContent = `Kills this match: ${matchKills} vs all time ${highScore}`;

      const c1 = document.createElement('p');
      c1.textContent = `Kills this match: ${matchKills} vs all time ${highScore}`;


      // card elements this match

      const m1 = document.createElement('p');
      m1.textContent = `Kills: ${matchKills}`;

      const m2 = document.createElement('p');
      m2.textContent = `K/D: ${matchKd}`;

      const m3 = document.createElement('p');
      m3.textContent = `Precision kills: ${matchPrec}`;

      const m4 = document.createElement('p');
      m4.textContent = `Melee kills: ${matchMelee}`;

      const m5 = document.createElement('p');
      m5.textContent = `Grenade kills: ${matchGrenade}`;

      const m6 = document.createElement('p');
      m6.textContent = `Super kills: ${matchSuper}`;

      // card elements all time
      // header
      const s1  = document.createElement('h2');
      s1.textContent = 'All time stats';
      // most kills ever
      const p1 = document.createElement('p');
      p1.textContent = `Highest kills in any match: ${highScore}`;
      // combat rating as elo
      const p2 = document.createElement('p');
      p2.textContent = `Current combat rating: ${elo}`;

      // win loss ratio all time
      const p5 = document.createElement('p');
      p5.textContent = `All time win/loss ratio: ${winLossRatio}`;
      // per-game average precision kills
      const p6 = document.createElement('p');
      p6.textContent = `Precision kills - per-game average: ${prec}`;
      // TODO: fetch per-game average kills
      const p7 = document.createElement('p');
      p7.textContent = 'All kills - per-game average'

      const p4 = document.createElement('p');
      p4.textContent = `K/D ratio: ${kd}`;

      */

      // access the `key` variable and `item` variable
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      if (winVal == 0) {
        //  block of code to be executed if the condition is true
        h1.style = "background-image: linear-gradient(120deg, var(--color-win) 0%, gray 100%)";
      } else {
        //  block of code to be executed if the condition is false
        h1.style = "background-image: linear-gradient(120deg, var(--color-lose) 0%, gray 100%)";
      };

      h1.textContent = pname;

      container.appendChild(card);
      // player name as header
      card.appendChild(h1);
      // section header - this match
      card.appendChild(s2);
      // values
      card.appendChild(p2);
      card.appendChild(p3);
      card.appendChild(p4);
      // section header - comparison
      card.appendChild(s3);
      card.appendChild(c1);
      card.appendChild(c2);
      card.appendChild(c3);



    });




  })
}

function allTimeCall(platform, memid, charId) {
  let gambitUrl = "https://www.bungie.net/Platform/Destiny2/"+ platform + "/Account/" + memid + "/Character/" + charId + "/Stats/"
  //console.log(pvpUrl);
  return $.ajax({
    url: gambitUrl,
    type: 'GET',
    dataType: 'json',
    timeout: 3000,
    headers:  {"X-API-Key": apiKey}
  });
}

function instanceCall() {
  return $.ajax({
    // jarg hunter pvp
    url: "https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009399245548/Stats/Activities/?mode=63",
    type: 'GET',
    dataType: 'json',
    timeout: 3000,
    headers: {"X-API-Key": apiKey}
  });
}

function carnageCall(data) {
  // Variables created from response
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
          //console.log(response);
        }).fail(function() {
          alert("carnageCall blew it :(");
        });
    }).fail(function() {
      alert("instanceCall blew it :(");
    });
});
