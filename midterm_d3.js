var FB_PRSNID = "PrsID";
var FB_PRSNLBL = "PrsLabel";
var FB_BYR = "BYear";
var FB_BLOC = "BLocLabel";
var FB_BLOCID = "BLocID";
var FB_BLOCLAT = "BLocLat";
var FB_BLOCLONG = "BLocLong";
var FB_DYR = "DYear";
var FB_DLOC = "DLocLabel";
var FB_DLOCID = "DLocID";
var FB_DLOCLAT = "DLocLat";
var FB_DLOCLONG = "DLocLong";
var FB_GENDER = "GENDER";
var FB_ARTS = "PerformingArts";
var FB_CREATIVE = "Creative";
var FB_GOV = "Gov/Law/Mil/Act/Rel";
var FB_ACAD = "Academic/Edu/Health";
var FB_SPORTS = "Sports";
var FB_BUSINESS = "Business/Industry/Travel";
var map = new Datamap({
						element: document.getElementById('container'),
						geographyConfig: {
							hideAntarctica: false,
							popupOnHover: false,
							highlightOnHover: false
						},
						fills: {
							'LOC': '#ff0000',
							'PerformingArts': '#00ff00',
							'Creative': '#0000ff',
							'Gov/Law/Mil/Act/Rel': '#ffff00',
							'Academic/Edu/Health': '#ff00ff',
							'Sports': '#00ffff',
							'Business/Industry/Travel': '#ffffff',
							defaultFill: '#EDDC4E'
						},
						data: {
							'PerformingArts': {fillKey: 'PerformingArts'},
							'Creative': {fillKey: 'Creative'},
							'Gov/Law/Mil/Act/Rel': {fillKey: 'Gov/Law/Mil/Act/Rel'},
							'Academic/Edu/Health': {fillKey: 'Academic/Edu/Health'},
							'Sports': {fillKey: 'Sports'},
							'Business/Industry/Travel': {fillKey: 'Business/Industry/Travel'},
						}
					});
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var locations = {};
var locs = [];
d3.csv("SchichDataS1_FB.csv", function(teamdata) {
	var result = teamdata.map(function(d) {
								if(parseFloat(d[FB_DYR]) > 0 && 
												(d[FB_ARTS] == "1" || 
													d[FB_CREATIVE] == "1" || 
													d[FB_GOV] == "1" || 
													d[FB_ACAD] == "1" || 
													d[FB_SPORTS] == "1" || 
													d[FB_BUSINESS] == "1")
												) {
													var key = d[FB_DLOC];
													if(key in locations) {
														locations[key].profession[FB_ARTS] = locations[key].profession[FB_ARTS] + parseFloat(d[FB_ARTS]);
														locations[key].profession[FB_CREATIVE] = locations[key].profession[FB_CREATIVE] + parseFloat(d[FB_CREATIVE]);
														locations[key].profession[FB_GOV] = locations[key].profession[FB_GOV] + parseFloat(d[FB_GOV]);
														locations[key].profession[FB_ACAD] = locations[key].profession[FB_ACAD] + parseFloat(d[FB_ACAD]);
														locations[key].profession[FB_SPORTS] = locations[key].profession[FB_SPORTS] + parseFloat(d[FB_SPORTS]);
														locations[key].profession[FB_BUSINESS] = locations[key].profession[FB_BUSINESS] + parseFloat(d[FB_BUSINESS]);
													} else {
														locations[key] = {
															latitude: parseFloat(d[FB_DLOCLAT]),
															longitude: parseFloat(d[FB_DLOCLONG]),
															profession: {},
															loc: d[FB_DLOC]
														}
														locations[key].profession[FB_ARTS] = parseFloat(d[FB_ARTS]);
														locations[key].profession[FB_CREATIVE] = parseFloat(d[FB_CREATIVE]);
														locations[key].profession[FB_GOV] = parseFloat(d[FB_GOV]);
														locations[key].profession[FB_ACAD] = parseFloat(d[FB_ACAD]);
														locations[key].profession[FB_SPORTS] = parseFloat(d[FB_SPORTS]);
														locations[key].profession[FB_BUSINESS] = parseFloat(d[FB_BUSINESS]);
													}
								}
								
							});
	console.log(Object.size(locations));
	for(var i in locations) {
		//console.log(locations[i].profession);
		//console.log(Object.values(locations[i].profession));
		var max_count = Math.max(...Object.values(locations[i].profession));
		var max_profession = Object.keys(locations[i].profession).reduce(function(a, b){ return locations[i].profession[a] > locations[i].profession[b] ? a : b });
		//console.log(max_count);
		//console.log(max_profession);
		
		var locObj = {latitude : locations[i].latitude,
						longitude: locations[i].longitude,
						radius: 3,
						fillKey: max_profession,
						profession: max_profession,
						Location: locations[i].loc 
					};
		locs.push(locObj);
	}
	console.log("returned");
	console.log(locs.length);
	FBBubbles();
	//drawMap(locs);
	//map.bubbles(locations.slice(0,locations.length/4),{});
});

function FBBubbles() {
	console.log("starting fb bubble draw");
	map.bubbles(locs,{
				popupTemplate:function (geography, data) { 
					return ['<div class="hoverinfo"><strong>' +  data.Location + '</strong>',
					'<br/>Profession: ' +  data.profession + '',
					'</div>'].join('');
				}
	});
	console.log("ending fb bubble draw");
}


