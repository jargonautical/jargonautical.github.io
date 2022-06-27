const app = document.getElementById('root');

//const logo = document.createElement('img');
//logo.src = 'logo.png';
//logo.src = '../assets/Jargonautical_web_icon.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

//app.appendChild(logo);
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

    var allTime = allTimeCall(platform, memid).done(function(response) {
      let foo = response.Response.mergedAllCharacters.results.allPvP.allTime;
      console.log(foo);
      let highScore = foo.bestSingleGameKills.basic.displayValue;
      let kills = foo.kills.pga.displayValue;
      let bestWeapon = foo.weaponBestType.basic.displayValue;
      let elo = foo.combatRating.basic.displayValue;
      let kd = foo.killsDeathsRatio.basic.displayValue;
      let winLossRatio = foo.winLossRatio.basic.displayValue;
      let prec = foo.precisionKills.pga.displayValue;

      var options = {
        events: false,
        responsive: false,
        tooltips: {
          enabled: false
        },
        //hover: {
        //  animationDuration: 0
        //},
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            //ctx.font = "Chivo";
            //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, "Chivo");
            //ctx.textAlign = 'center';
            //ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x + 15, bar._model.y + 5);
              });
            });
          }
        },
        legend: { display: false },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
                beginAtZero: true,   // minimum value will be 0.
                max: 7
              }
            }]
          }
        }
        if (matchGrenade <= 1) {
          shaxx = '"DID YOU THROW ENOUGH GRENADES?"';
        } else if (matchKd > 3) {
          shaxx = '"CAREFUL, GUARDIAN - YOU\'RE SCARING THEM!"';
        } else if (matchKd  < 0.4) {
          shaxx = '"Come back when you\'re ready :("';
        } else {
          shaxx = '"Shaxx has no words ... 👍🏿"';
        }

          var kdStats = {
            labels: ["This match", "All time average"],
            datasets: [
                {
                    data: [matchKd, kd],
                    backgroundColor: ["firebrick", "lightgray"]
                }
              ]
            };

        var canvas = document.createElement('canvas');
        //canvas.width = 5;
        //canvas.height = 1;
        var ctx = canvas.getContext("2d");
        var kdChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: kdStats,
          options: options
        });




      const p1 = document.createElement('h4');
      p1.textContent = "Efficiency";

      const p2 = document.createElement('h4');
      p2.textContent = `Combat rating: ${elo}`;

      const p3 = document.createElement('h4');
      p3.textContent = "Game stats";

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      //h1.style = "background-image: linear-gradient(120deg, turquoise 0%, lightseagreen 100%)";
      h1.style = "background: lightseagreen";
      h1.textContent = pname;

      const allKills = document.createElement('p');
      allKills.textContent = `Total kills: ${matchKills}  (PGA ${kills})`;

      var pic1 = document.createElement('img');
      pic1.setAttribute("src", "200px-Discipline_Icon.png");
      pic1.setAttribute("height", "50");
      pic1.setAttribute("width", "50");

      var pic2 = document.createElement('img');
      pic2.setAttribute("src", "200px-Strength_Icon.png");
      pic2.setAttribute("height", "50");
      pic2.setAttribute("width", "50");

      var pic3 = document.createElement('img');
      pic3.setAttribute("src", "200px-Intellect_Icon.png");
      pic3.setAttribute("height", "50");
      pic3.setAttribute("width", "50");

      const grenadeKills = document.createElement('p');
      const meleeKills = document.createElement('p');
      const superKills = document.createElement('p');

      const grrr = document.createElement('iconbox');
      const grrtext = document.createElement('icontext');
      const grricon = document.createElement('img');
      grrtext.textContent = `${matchGrenade}`;
      grricon.setAttribute("src", "200px-Discipline_Icon.png");
      grricon.setAttribute("height", "40");
      grricon.setAttribute("width", "40");


      const melees = document.createElement('p');
      //melees.textContent = `Melees: ${matchMelee}`;

      melees.textContent = `Melees: ${matchMelee}`;

      const grenades = document.createElement('p');
      grenades.textContent = `Grenades: ${matchGrenade}`;

      const supers = document.createElement('p');
      supers.textContent = `Supers: ${matchSuper}`;

      const line =  document.createElement('h5');
      line.textContent = ' ';
      const line2 =  document.createElement('h5');
      line2.textContent = ' ';

      const precShots = document.createElement('p');
      precShots.textContent = `Precision shots: ${matchPrec}`;

      const motivate = document.createElement('h3');
      motivate.textContent = `${shaxx}`;

      container.appendChild(card);

      // player name as header
      card.appendChild(h1);
      card.appendChild(p2);
      card.appendChild(line);
      card.appendChild(p1);
      card.appendChild(canvas);
      card.appendChild(line2);
      card.appendChild(p3);
      card.appendChild(allKills);
      card.appendChild(grenades);
      card.appendChild(melees);
      card.appendChild(supers);
      card.appendChild(precShots);
      //card.appendChild(grrr);
      //grrr.appendChild(grricon);
      //grrr.appendChild(grrtext);
      card.appendChild(motivate);


    });

  })
}

function allTimeCall(platform, memid) {
  let pvpUrl = "https://www.bungie.net/Platform/Destiny2/"+ platform + "/Account/" + memid + "/Stats/"
  //console.log(pvpUrl);
  return $.ajax({
    url: pvpUrl,
    type: 'GET',
    dataType: 'json',
    timeout: 3000,
    headers:  {"X-API-Key": apiKey}
  });
}

function instanceCall() {
  return $.ajax({
    // jarg hunter pvp
    url: "https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/2305843009399245548/Stats/Activities/?mode=5",
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
