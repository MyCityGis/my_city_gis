define(['leaflet','jquery','bootstrap'],function(L,$){

	 'use strict;'


	L.Control.AddProblem = L.Control.extend({
		options: {
            position: 'bottomleft',
            iconLoading: 'glyphicon glyphicon-plus',
            icon: 'glyphicon glyphicon-plus',
        },
        onAdd:function(map){
        	
        	this.map = map;

            this.container = L.DomUtil.create('div',
                'leaflet-control-addproblem leaflet-control');

            this.button = L.DomUtil.create('div', 'btn-icopanel btn btn-primary addproblem', this.container);
            this.button.title = 'Добавить проблему';
            this.btnIcon = L.DomUtil.create('i', 'glyphicon glyphicon-plus', this.button);
            this.button.id = 'addproblem';

            L.DomEvent
                .on(this.button, 'click', this._addProblem,this)
                .on(this.button, 'click', L.DomEvent.stopPropagation)
                .on(this.button, 'click', L.DomEvent.stop)
                .on(this.button, 'click', L.DomEvent.preventDefault)
                .on(this.button, 'dblclick', L.DomEvent.stopPropagation)
                .addListener(this.button, "contextmenu", L.DomEvent.stopPropagation)
                .addListener(this.button, "contextmenu", L.DomEvent.preventDefault)

            return this.container
        },

        _addProblem:function(){
        	
        	var that = this;

        	var btn = $(this.button);

        	if(!btn.hasClass('pushed')){
        		
        		btn.addClass('pushed');

        		var data = this.map.getCenter();
        		var lat = data.lat,
        			lng = data.lng;
        		
        		window.marker = L.marker([lat,lng],{draggable:true});
        		marker.bindPopup("<button type='button' class='btn btnadd' data-toggle='modal' data-target='#myModal'>Добавить проблему</button");
        		
        		marker.addTo(this.map);
        		marker.openPopup();
        		
        		$('.leaflet-popup-close-button').click(function(){
        			marker.remove();
        			btn.removeClass('pushed');
        		});

        		var coords = marker.getLatLng();
        		this._geocode(coords);

        		marker.on('dragend',function(){
        			marker.openPopup();
        			var coords = marker.getLatLng();
        			that._geocode(coords);
        		});

        		$('#send').click(function(){
        			that._ajax();
        		});
        		// L.DomEvent.on(map, 'click', this._interact, this);

        	}else{
        		btn.removeClass('pushed');
        		marker.remove();
        		// L.DomEvent.off(map, 'click', this._interact, this);
        	}
        },
        _geocode:function(e){

        	var reverse_geocode = "http://nominatim.openstreetmap.org/reverse?format=json",
              lat = "&lat="+e.lat.toString(),
              lng = "&lon="+e.lng.toString(),
              zoom = "&zoom=18&addressdetails=1",
              address_url = reverse_geocode+lat+lng+zoom;

          	var array = [];

          	$.get(address_url, function(data, status){
	            var address_ = data.display_name.split(",").slice(0,4).reverse();

	            if(array.length == 0){
	              array.push(address_);       
	            }else if(array.length == 1){
	              array[0] = address_;
	            }

	            $('.leaflet-popup-content').prepend("<strong>Адрес: </strong>"+ 
	                            "<div id='addr'>"+ array[0].toString() +'</div>' +"<br><br>");
	            
	          });
	        },
	        _ajax:function(){
	        	var that = this;

	        	var address = $("#addr").html(),
	        		comment = $(".comment").val();
	        		photo = $('#photo')[0].files[0];
	        		latitude = marker.getLatLng().lat;
	        		longitude = marker.getLatLng().lng;

	        	var data = {
	        		address:address,
	        		comment:comment,
	        		photo:photo,
	        		latitude:""+latitude,
	        		longitude:""+longitude,
	        	};


	        	var formData = new FormData();
	        	formData.append('address',data.address); 
				formData.append('comment',data.comment); 
				formData.append('latitude',data.latitude); 
				formData.append('longitude',data.longitude); 
				formData.append('photo', data.photo); 

	        	// debugger;
        		$.ajax({
        			type:'POST',
        			url:'/addproblem/', 
					
					processData: false, 
					contentType: false, 

					dataType: 'json', 
					data: formData 
        		}).done(function( data ) {
		            console.log(data)
		        });	
	        }
		});

	L.control.addproblem = function(options) {
        return new L.Control.AddProblem();
    };
    return L.control.addproblem;
})