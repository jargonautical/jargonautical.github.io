const app = document.getElementById('root');

const container = document.createElement('div');
const loader = document.createElement('div');

const apiKey = 'a43fee90ad014eb880cb591885a383c4';

const characterHunter = "2305843009399245548";
const characterTitan = "2305843009423934835";
const characterWarlock = "2305843009840734890";

const modeCrucible = 5;
const urlCrucible = function(platform, memId) { return `https://www.bungie.net/Platform/Destiny2/${platform}/Account/${memId}/Stats/`; }
const modeGambit = 63;
const urlGambit = function(platform, memId, charId) { return `https://www.bungie.net/Platform/Destiny2/${platform}/Account/${memId}/Character/${charId}/Stats/`; }

const urlInstance = function(character, mode) { return `https://www.bungie.net/Platform/Destiny2/3/Account/4611686018476645284/Character/${character}/Stats/Activities/?mode=${mode}`; }
const urlCarnage = function(instanceId) { return `https://www.bungie.net/platform/Destiny2/Stats/PostGameCarnageReport/${instanceId}/`; }

// use data from each player and return a card element
const buildGambitCard = function(matchReport, allTimeReport) {
	let charId = matchReport.characterId;
	let pname = matchReport.player.destinyUserInfo.displayName;
	let memid = matchReport.player.destinyUserInfo.membershipId;
	let platform = matchReport.player.destinyUserInfo.membershipType;
	let matchKills = matchReport.values.kills.basic.displayValue;
	let matchKd = matchReport.values.killsDeathsRatio.basic.displayValue;
	let matchPrec = matchReport.extended.values.precisionKills.basic.displayValue;
	let matchGrenade = matchReport.extended.values.weaponKillsGrenade.basic.displayValue;
	let matchMelee = matchReport.extended.values.weaponKillsMelee.basic.displayValue;
	let matchSuper = matchReport.extended.values.weaponKillsSuper.basic.displayValue;
	let winVal = matchReport.values.standing.basic.value * 100;
	
	console.log('all time pve stats', allTimeReport);
	let highScore = allTimeReport.bestSingleGameKills.basic.displayValue;
	let kills = allTimeReport.kills.pga.displayValue;
	let bestWeapon = allTimeReport.weaponBestType.basic.displayValue;
	//let elo = allTimeReport.combatRating.basic.displayValue;
	let invaderKills = allTimeReport.invaderKills.basic.displayValue;
	let invasionKills = allTimeReport.invasionKills.basic.displayValue;
	let kd = allTimeReport.killsDeathsRatio.basic.displayValue;
	let winLossRatio = allTimeReport.winLossRatio.basic.displayValue;
	let prec = allTimeReport.precisionKills.pga.displayValue;
	// card elements current info
	const s2 = document.createElement('h4');
	s2.textContent = 'All time stats';
	// card elements comparison
	const s3 = document.createElement('h4');
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
	let card = document.createElement('div');
	card.setAttribute('class', 'card');
	
	let h1 = document.createElement('h1');
	if (winVal == 0) {
		//  block of code to be executed if the condition is true
		//h1.style = "background-image: linear-gradient(120deg, var(--color-win) 0%, gray 100%)";
		h1.style = "background: var(--color-win);";
	} else {
		//  block of code to be executed if the condition is false
		//h1.style = "background-image: linear-gradient(120deg, var(--color-lose) 0%, gray 100%)";
		h1.style = "background: var(--color-lose);";
	};
	
	h1.textContent = pname;
	
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
	return card;
}

const buildCrucibleCard = function(matchReport, allTimeReport) {
	let charId = matchReport.characterId;
	let pname = matchReport.player.destinyUserInfo.displayName;
	let memid = matchReport.player.destinyUserInfo.membershipId;
	let platform = matchReport.player.destinyUserInfo.membershipType;
	let matchKills = matchReport.values.kills.basic.displayValue;
	let matchKd = matchReport.values.killsDeathsRatio.basic.displayValue;
	let matchPrec = matchReport.extended.values.precisionKills.basic.displayValue;
	let matchGrenade = matchReport.extended.values.weaponKillsGrenade.basic.displayValue;
	let matchMelee = matchReport.extended.values.weaponKillsMelee.basic.displayValue;
	let matchSuper = matchReport.extended.values.weaponKillsSuper.basic.displayValue;
	let winVal = matchReport.values.standing.basic.value * 100;
	
	let highScore = allTimeReport.bestSingleGameKills.basic.displayValue;
	let kills = allTimeReport.kills.pga.displayValue;
	let bestWeapon = allTimeReport.weaponBestType.basic.displayValue;
	let elo = allTimeReport.combatRating.basic.displayValue;
	let kd = allTimeReport.killsDeathsRatio.basic.displayValue;
	let winLossRatio = allTimeReport.winLossRatio.basic.displayValue;
	let prec = allTimeReport.precisionKills.pga.displayValue;
	
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
	if (matchKd > 2) {
		shaxx = '"Careful Guardian - you\'re scaring them!"';
	} else if (matchSuper >= 1) {
		shaxx = '"I BET THEY DIDN\'T EXPECT THAT!"';
	} else if (matchKd  < 0.5) {
		shaxx = '"Come back when you\'re ready :("';
	} else if (matchGrenade == 0) {
		shaxx = '"Did you throw enough grenades?"';
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
	//h1.style = "background: lightseagreen";
	if (winVal == 0) {
		//  block of code to be executed if the condition is true
		//h1.style = "background-image: linear-gradient(120deg, var(--color-win) 0%, gray 100%)";
		h1.style = "background: var(--color-win);";
	} else {
		//  block of code to be executed if the condition is false
		//h1.style = "background-image: linear-gradient(120deg, var(--color-lose) 0%, gray 100%)";
		h1.style = "background: var(--color-lose);";
	};
	h1.textContent = pname;
	
	const allKills = document.createElement('p');
	allKills.textContent = `Total kills: ${matchKills}  (PGA ${kills})`;
	
	var pic1 = document.createElement('img');
	pic1.setAttribute("src", "../assets/200px-Discipline_Icon.png");
	pic1.setAttribute("height", "50");
	pic1.setAttribute("width", "50");
	
	var pic2 = document.createElement('img');
	pic2.setAttribute("src", "../assets/200px-Strength_Icon.png");
	pic2.setAttribute("height", "50");
	pic2.setAttribute("width", "50");
	
	var pic3 = document.createElement('img');
	pic3.setAttribute("src", "../assets/200px-Intellect_Icon.png");
	pic3.setAttribute("height", "50");
	pic3.setAttribute("width", "50");
	
	const grenadeKills = document.createElement('p');
	const meleeKills = document.createElement('p');
	const superKills = document.createElement('p');
	
	const grrr = document.createElement('iconbox');
	const grrtext = document.createElement('icontext');
	const grricon = document.createElement('img');
	grrtext.textContent = `${matchGrenade}`;
	grricon.setAttribute("src", "../assets/200px-Discipline_Icon.png");
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
	
	
	// player name as header
	card.appendChild(h1);
	card.appendChild(p2);
	card.appendChild(line);
	card.appendChild(p1);
	card.appendChild(canvas);
	card.appendChild(line2);
	card.appendChild(p3);
	card.appendChild(allKills);
	//card.appendChild(grenades);
	//card.appendChild(melees);
	//card.appendChild(supers);
	card.appendChild(precShots);
	//card.appendChild(grrr);
	//grrr.appendChild(grricon);
	//grrr.appendChild(grrtext);
	card.appendChild(motivate);
	return card;
}

const apiCall = function(url) {
	return $.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		timeout: 10000,
		headers:  {"X-API-Key": apiKey}
	});
}

const gimmeTheStats = function(character, mode) {
	$(container).empty();
	app.prepend(loader);

	apiCall(urlInstance(character, mode))
	.done(function(dataInstance) {
		console.log('instanceCall', dataInstance);
		let instanceId = dataInstance.Response.activities[0].activityDetails.instanceId;
		
		apiCall(urlCarnage(instanceId))
		.done(function(dataCarnage) {
			console.log('carnageCall', dataCarnage);

			let promises = [];
			
			dataCarnage.Response.entries.forEach(function(matchReport) {
				let platform = matchReport.player.destinyUserInfo.membershipType;
				let memId = matchReport.player.destinyUserInfo.membershipId;
				let call = null;
				if (mode == modeGambit) {
					let charId = matchReport.characterId;
					call = apiCall(urlGambit(platform, memId, charId));
				} else if(mode == modeCrucible) {
					call = apiCall(urlCrucible(platform, memId));
				}

				promises.push(call);
				
				call
				.done(function(dataAllTime) {
					console.log('allTimeCall', dataAllTime);
					
					let card = null;
					
					if (mode == modeGambit) {
						let allTimeReport = dataAllTime.Response.allPvECompetitive.allTime;
						card = buildGambitCard(matchReport, allTimeReport);
					} else if (mode == modeCrucible) {
						let allTimeReport = dataAllTime.Response.mergedAllCharacters.results.allPvP.allTime;
						card = buildCrucibleCard(matchReport, allTimeReport);
					}
					container.appendChild(card);
				})
				.fail(function(xhr, data) {
					console.log(data);
					alert("allTimeCall blew it :(");
				});
			});

			// remove loading symbol once all calls are done
			Promise.all(promises)
			.then(function() {
				app.removeChild(loader);
			})
		})
		.fail(function() {
			alert("carnageCall blew it :(");
		});
	})
	.fail(function() {
		alert("instanceCall blew it :(");
	});
}

$(document).ready(function() {
	loader.setAttribute('class', 'loader');
	container.setAttribute('class', 'container');
	app.appendChild(container);
});
