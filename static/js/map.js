define([
		'jquery',
		'leaflet',
		'leaflet-mycity-addproblem',
	
	],function($,L){
	var map = L.map('map').setView([47.2, 39.8], 7);
	
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});

	osm.addTo(map);

	map.zoomControl.setPosition('topright');

	$('.leaflet-control-attribution').remove();

	var addproblem = L.control.addproblem();
	addproblem.addTo(map);

	return map
})