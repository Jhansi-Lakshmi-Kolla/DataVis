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


var ULAN_DYR = "DYear";
var ULAN_DLOC = "DLocLabel";
var ULAN_DLOCLAT = "DLocLat";
var ULAN_DLOCLONG = "DLocLang";
var ULAN_GENDER = "Sex";
var ULAN_AA = "AppliedArts";
var ULAN_ARCH = "Architecture";
var ULAN_FA = "FineArts";
var ULAN_PA = "PerformingArts";
var ULAN_PG = "Print&Graphics";
var ULAN_ACAD = "Academic";
var ULAN_OTHER = "Other";

var mapFills = {};
mapFills[FB_ARTS] = '#00ff00'
mapFills[FB_CREATIVE] = '#0000ff'
mapFills[FB_GOV] = '#ffff00'
mapFills[FB_ACAD] = '#ff00ff'
mapFills[FB_SPORTS] = '#00ffff'
mapFills[FB_BUSINESS] = '#ffffff'

mapFills[ULAN_AA] = '#00ff00'
mapFills[ULAN_ARCH] = '#0000ff'
mapFills[ULAN_FA] = '#ffff00'
mapFills[ULAN_PA] = '#ff00ff'
mapFills[ULAN_PG] = '#00ffff'
mapFills[ULAN_ACAD] = '#AA070B'
mapFills[ULAN_OTHER] = '#ffffff'

mapFills['LOC'] = "#ff0000"
mapFills['defaultFill'] = '#EDDC4E'
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
					
function clearBubbles() { map.bubbles([])};
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var fblocationmap = {};
var akllocationmap = {};
var ulanlocationmap = {};
var fblocs = [];
var akllocs = [];
var ulanlocs = [];
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
													if(key in fblocationmap) {
														fblocationmap[key].profession[FB_ARTS] = fblocationmap[key].profession[FB_ARTS] + parseFloat(d[FB_ARTS]);
														fblocationmap[key].profession[FB_CREATIVE] = fblocationmap[key].profession[FB_CREATIVE] + parseFloat(d[FB_CREATIVE]);
														fblocationmap[key].profession[FB_GOV] = fblocationmap[key].profession[FB_GOV] + parseFloat(d[FB_GOV]);
														fblocationmap[key].profession[FB_ACAD] = fblocationmap[key].profession[FB_ACAD] + parseFloat(d[FB_ACAD]);
														fblocationmap[key].profession[FB_SPORTS] = fblocationmap[key].profession[FB_SPORTS] + parseFloat(d[FB_SPORTS]);
														fblocationmap[key].profession[FB_BUSINESS] = fblocationmap[key].profession[FB_BUSINESS] + parseFloat(d[FB_BUSINESS]);
													} else {
														fblocationmap[key] = {
															latitude: parseFloat(d[FB_DLOCLAT]),
															longitude: parseFloat(d[FB_DLOCLONG]),
															profession: {},
															loc: d[FB_DLOC]
														}
														fblocationmap[key].profession[FB_ARTS] = parseFloat(d[FB_ARTS]);
														fblocationmap[key].profession[FB_CREATIVE] = parseFloat(d[FB_CREATIVE]);
														fblocationmap[key].profession[FB_GOV] = parseFloat(d[FB_GOV]);
														fblocationmap[key].profession[FB_ACAD] = parseFloat(d[FB_ACAD]);
														fblocationmap[key].profession[FB_SPORTS] = parseFloat(d[FB_SPORTS]);
														fblocationmap[key].profession[FB_BUSINESS] = parseFloat(d[FB_BUSINESS]);
													}
								}
								
							});
	console.log(Object.size(fblocationmap));
	for(var i in fblocationmap) {
		var max_count = Math.max(...Object.values(fblocationmap[i].profession));
		var max_profession = Object.keys(fblocationmap[i].profession).reduce(function(a, b){ return fblocationmap[i].profession[a] > fblocationmap[i].profession[b] ? a : b });
		//console.log(max_profession);
		var locObj = {latitude : fblocationmap[i].latitude,
						longitude: fblocationmap[i].longitude,
						radius: 3,
						fillKey: max_profession,
						profession: max_profession,
						Location: fblocationmap[i].loc 
					};
		fblocs.push(locObj);
	}
	console.log("returned");
	console.log("fblocs length " + fblocs.length);
	FBBubbles();
	/*map.bubbles(fblocs,{
				popupTemplate:function (geography, data) { 
					return ['<div class="hoverinfo"><strong>' +  data.Location + '</strong>',
					'<br/>Profession: ' +  data.profession + '',
					'</div>'].join('');
				}
	});*/
});

d3.csv("SchichDataS3_ULAN.csv", function(teamdata) {
	var result = teamdata.map(function(d) {
								if(parseFloat(d[ULAN_DYR]) > 0 && 
												(d[ULAN_AA] == "1" || 
												d[ULAN_ARCH] == "1" || 
												d[ULAN_FA] == "1" || 
												d[ULAN_PA] == "1" || 
												d[ULAN_PG] == "1" || 
												d[ULAN_ACAD] == "1" ||
												d[ULAN_OTHER] == "1")
												) {
													var key = d[ULAN_DLOC];
													if(key in ulanlocationmap) {
														ulanlocationmap[key].profession[ULAN_AA] = ulanlocationmap[key].profession[ULAN_AA] + parseFloat(d[ULAN_AA]);
														ulanlocationmap[key].profession[ULAN_ARCH] = ulanlocationmap[key].profession[ULAN_ARCH] + parseFloat(d[ULAN_ARCH]);
														ulanlocationmap[key].profession[ULAN_FA] = ulanlocationmap[key].profession[ULAN_FA] + parseFloat(d[ULAN_FA]);
														ulanlocationmap[key].profession[ULAN_PA] = ulanlocationmap[key].profession[ULAN_PA] + parseFloat(d[ULAN_PA]);
														ulanlocationmap[key].profession[ULAN_PG] = ulanlocationmap[key].profession[ULAN_PG] + parseFloat(d[ULAN_PG]);
														ulanlocationmap[key].profession[ULAN_ACAD] = ulanlocationmap[key].profession[ULAN_ACAD] + parseFloat(d[ULAN_ACAD]);
														ulanlocationmap[key].profession[ULAN_OTHER] = ulanlocationmap[key].profession[ULAN_OTHER] + parseFloat(d[ULAN_OTHER]);
													} else {
														ulanlocationmap[key] = {
															latitude: parseFloat(d[FB_DLOCLAT]),
															longitude: parseFloat(d[FB_DLOCLONG]),
															profession: {},
															loc: d[FB_DLOC]
														}
														ulanlocationmap[key].profession[ULAN_AA] = parseFloat(d[ULAN_AA]);
														ulanlocationmap[key].profession[ULAN_ARCH] = parseFloat(d[ULAN_ARCH]);
														ulanlocationmap[key].profession[ULAN_FA] = parseFloat(d[ULAN_FA]);
														ulanlocationmap[key].profession[ULAN_PA] = parseFloat(d[ULAN_PA]);
														ulanlocationmap[key].profession[ULAN_PG] = parseFloat(d[ULAN_PG]);
														ulanlocationmap[key].profession[ULAN_ACAD] = parseFloat(d[ULAN_ACAD]);
														ulanlocationmap[key].profession[ULAN_OTHER] = parseFloat(d[ULAN_OTHER]);
													}
								}
								
							});
	console.log(Object.size(ulanlocationmap));
	for(var i in ulanlocationmap) {
		var max_count = Math.max(...Object.values(ulanlocationmap[i].profession));
		var max_profession = Object.keys(ulanlocationmap[i].profession).reduce(function(a, b){ return ulanlocationmap[i].profession[a] > ulanlocationmap[i].profession[b] ? a : b });
		
		var locObj = {latitude : ulanlocationmap[i].latitude,
						longitude: ulanlocationmap[i].longitude,
						radius: 3,
						fillKey: max_profession,
						profession: max_profession,
						Location: ulanlocationmap[i].loc 
					};
		ulanlocs.push(locObj);
	}
	console.log("ulan parsing done with length " + ulanlocs.length);
});

function FBBubbles() {
	clearBubbles();
	console.log("start drawing fb bubbles");
	map.bubbles(fblocs,{
				popupTemplate:function (geography, data) { 
					return ['<div class="hoverinfo"><strong>' +  data.Location + '</strong>',
					'<br/>Profession: ' +  data.profession + '',
					'</div>'].join('');
				}
	});
	console.log("end drawing fb bubbles");
}

function ULANBubbles() {
	clearBubbles();
	console.log("start drawing ulan bubbles " + ulanlocs.length);
	map.bubbles(ulanlocs,{
				popupTemplate:function (geography, data) { 
					return ['<div class="hoverinfo"><strong>' +  data.Location + '</strong>',
					'<br/>Profession: ' +  data.profession + '',
					'</div>'].join('');
				}
	});
	console.log("end drawing ulan bubbles");
}


