/*d3.csv("SchichDataS3_ULAN.csv", function(teamdata) {
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
	console.log("returned");
	console.log(ulanlocs.length);
});*/