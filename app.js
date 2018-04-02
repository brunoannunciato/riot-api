var  urlSlices = {
	uri: 'https://br1.api.riotgames.com/',
	user: 'lol/summoner/v3/summoners/by-name/',
	league: 'lol/league/v3/positions/by-summoner/'
	},

	urlString = window.location.href,
	urlParsed = new URL(urlString);
	summonerName = urlParsed.searchParams.get('summoner'); 

	// summonerName = 'Peiximps';

fetch(urlSlices.uri + urlSlices.user + summonerName + apiKey)
.then(function(userResponse){
    userResponse.json().then(function(userData){

    	var sName  = document.querySelector('.summoner-name'),
    		sLevel = document.querySelector('.summoner-level');

		sName.textContent = userData.name;
		sLevel.textContent = userData.summonerLevel;

		return fetch(urlSlices.uri + urlSlices.league + userData.id + apiKey)
		.then(function(leagueResponse){
			leagueResponse.json().then(function(leagueData){
				if (leagueData != 0) {
					var sEloS  = document.querySelector('.summoner-elo-solo'),
						sEloF  = document.querySelector('.summoner-elo-flex');

					function translateTier(tier) {
						var lolTiers = { 'SILVER': 'Prata', 'GOLD': 'Ouro', 'PLATINUM': 'Platina', 'DIAMOND': 'Diamante', 'MASTER': 'Mestre', 'Challenger': 'Desafiante'};
						var TranslatedTier = tier.replace(/SILVER|GOLD|PLATINUM|DIAMOND|MASTER|CHALLENGER/g, function(match){return lolTiers[match];});

						return TranslatedTier;
					}
						
					sEloS.textContent = translateTier(leagueData[0].tier) + ' ' + leagueData[0].rank;
					sEloF.textContent = translateTier(leagueData[1].tier) + ' ' + leagueData[1].rank;
				} else {
					console.log('nao')
				}





			})
		})
    });
  })