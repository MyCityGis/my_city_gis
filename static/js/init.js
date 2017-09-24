(function(){

	'use strict';

	require.config({
		urlArgs: "bust=" + (new Date()).getTime(),
		baseUrl:'static',

		paths:{
			//LIBS
			/* jquery, mn, etc. */
			'jquery': 'libs/jquery/dist/jquery.min',
			'bootstrap':'libs/bootstrap/dist/js/bootstrap',

            /* leaflet and plugins */
            'leaflet': 'libs/leaflet/dist/leaflet',
            'leaflet-mycity-addproblem':'libs/leaflet-mycity-addproblem/src/leaflet-mycity-addproblem',

            /* models, collections, views, etc. */
            'map': 'js/map',

		},
		shim:{
			'bootstrap':{
				deps:['jquery']
			}
		}
	});

	require(['jquery','map'],function($, map){
		$(document).ready(function(){
			
		})
	})

})()