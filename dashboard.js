

var mapinfo=[0];
var listmyinfo=[];
var infome=[];
var userlat='';
var userlng='';
var centeruserid=''
var myraddist=''



//------------------------------------------------------------------------------
function listmyinfofunc(t) {
	alert('Running Filter');
	var index = mapinfo.indexOf(t);	
    if (index > -1) { 
    mapinfo.splice(index, 1);
	} else 
		 mapinfo.push(t); alert(mapinfo);
	     initMap(infome); 
}

//------------------------------------------------------------------------------
function setuserloc(j) {
	
userlat=infome[j].lat;
//alert(userlat);
userlng=infome[j].lng;	
//alert(userlng);
centeruserid=j;
  initMap(infome); 
}
	

function setmydist(j) {	
//alert(j);
myraddist=j;
 initMap(infome); 
}

//------------------------------------------------------------------------------
<!---report START--->
function profilerecord() { 

//var userdist='';
//if(myraddist!='') { userdist=myraddist;  } else { userdist=20;  }	
	//alert(userdist);

var myUUID=42;
  $.ajax({ 
        type: 'POST',
        url: 'store/profilerecord.php',
        data: {myUUID:myUUID},
        success: function(data)
        {
        //return(data);
		var info = JSON.parse(data);
		var length = Object.keys(info).length;
//alert(info[0].lat);
      	var A='';
		var B=''; 
		var ff='';
		var chkid='checkbox';
		var infoarrayvals='';
		
	<!------start list value----->	
		for(i=0;i<length;i++) {
			// if(userdist>distance(e[i].lat, e[i].lng, latorg, lngorg, unit))  {
 A+='<label class="label-checkbox item-content"><input onclick="listmyinfofunc(this.id);" id="'+info[i].id+'" type="checkbox" name="my-checkbox" value="" checked="checked" ><div style="background-color:#000; border-radius:25px; color:#FFF; padding-left:10px; width:250px; padding-right:10px" class="item-media"><i class="icon icon-form-checkbox"></i><span  class="item-title">'+info[i].First_Name+' '+info[i].Last_Name+' ('+info[i].Type+')</span></div><br></label>';
listmyinfo.push(info[i].id);
			// }
		           }		
				
for(j=0;j<length;j++) {	 B+='<option value="'+j+'">'+info[j].First_Name+' '+info[j].Last_Name+'</option>';	}			
var userselectstart='<select onchange="setuserloc(this.value)" name="cicleuser" id="cicleuser" class="formfield"><option value="1">Select Key User</option>';
var userselectend='</select>';
var userselect=userselectstart+B+userselectend;
		
var mileselect='<p><span class="wizard-inner"><select onchange="setmydist(this.value)" name="circledistance" id="circledistance" class="formfield"><option value="">Distance/Radius</option><option value="0.025">0.025</option><option value="0.05">0.05</option><option value="0.1">0.1</option><option value="2">2</option><option value="5">5</option><option value="7">7</option><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="500">500</option></select></span></p>';



 $('#theplanid').html(A+userselect+mileselect);  

 initMap(info); 
 infome=info;
	    },
        complete:function remove(){
           
        },
        error: function(){
          alert('Code 303A');
        }
    });
}
<!----report END---->


//------------------------------------------------------------------------------
<!---report START--->
function profilefilter() { 
alert('Running Filter');
var Typeflt=$('#Typeflt').val();
var Sexflt=$('#Sexflt').val();
var Languageflt=$('#Languageflt').val();
var ExperienceYearsflt=$('#ExperienceYearsflt').val();
var HireDateflt=$('#HireDateflt').val();
var AdmitDateflt=$('#AdmitDateflt').val();
var DischargeDateflt=$('#DischargeDateflt').val();
var Diagnosisflt=$('#Diagnosisflt').val();
var LevelCareflt=$('#LevelCareflt').val();


var myUUID=42;
  $.ajax({ 
        type: 'POST',
        url: 'filterrecord.php',
        data: {Typeflt:Typeflt,myUUID:myUUID,Sexflt:Sexflt,Languageflt:Languageflt,ExperienceYearsflt:ExperienceYearsflt,HireDateflt:HireDateflt,AdmitDateflt:AdmitDateflt,DischargeDateflt:DischargeDateflt,Diagnosisflt:Diagnosisflt,LevelCareflt:LevelCareflt},
        success: function(data)
        {
        //alert(data);
		var info = JSON.parse(data);
		var length = Object.keys(info).length;
//alert(info[0].lat);
      	var A='';
		var B=''; 
		var ff='';
		var chkid='checkbox';
		var infoarrayvals='';
	<!------start list value----->	
		for(i=0;i<length;i++) {
			 
 A+='<label class="label-checkbox item-content"><input onclick="listmyinfofunc(this.id);" id="'+info[i].id+'" type="checkbox" name="my-checkbox" value="" checked="checked" ><div style="background-color:#000; border-radius:25px; color:#FFF; padding-left:10px; width:250px; padding-right:10px" class="item-media"><i class="icon icon-form-checkbox"></i><span  class="item-title">'+info[i].First_Name+' '+info[i].Last_Name+' ('+info[i].Type+')</span></div><br></label>';
listmyinfo.push(info[i].id);
                 
		           }		
				
for(j=0;j<length;j++) {	 B+='<option value="'+j+'">'+info[j].First_Name+' '+info[j].Last_Name+'</option>';	}			
var userselectstart='<select onchange="setuserloc(this.value)" name="cicleuser" id="cicleuser" class="formfield"><option value="1">Select Key User</option>';
var userselectend='</select>';
var userselect=userselectstart+B+userselectend;
		
var mileselect='<p><span class="wizard-inner"><select onchange="setmydist(this.value)" name="circledistance" id="circledistance" class="formfield"><option value="">Distance/Radius</option><option value="0.025">0.025</option><option value="0.05">0.05</option><option value="0.1">0.1</option><option value="2">2</option><option value="5">5</option><option value="7">7</option><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="500">500</option></select></span></p>';



 $('#theplanid').html(A+userselect+mileselect);  

 initMap(info); 
 infome=info;

	    },
        complete:function remove(){
           
        },
        error: function(){
          alert('Code 303A');
        }
    });
}
<!----report END---->
//------------------------------------------------------------------------------	
var x = document.getElementById("mylat");
var y = document.getElementById("mylng");
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
		}
function showPosition(position) {
    x.value=position.coords.latitude;	
	y.value=position.coords.longitude;
	//initMap2();
}
 





//------------------------------------------------------------------------------
function initMap2() {

	var latorg=$('#mylat').val();
	var lngorg=$('#mylng').val();
	var latlngorg=latorg+','+lngorg;
	var myLatLng = new google.maps.LatLng(latorg, lngorg);
	
	
  var map = new google.maps.Map(document.getElementById('map2'), {
    zoom: 18,
	 center: myLatLng,
   zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: true,
	 streetViewControl: true,
	 mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_CENTER
    },

  }); 

	  var image = 'UI/images/icons/black/drmap.png';
  var beachMarker = new google.maps.Marker({
     position:  myLatLng,
    map: map,
	 draggable: true,
    icon: image,
 title: "Witness"
  });
  
var rad=0.015;

  var radius=1609.34*rad;
  var circle = new google.maps.Circle({
  map: map,
  radius: radius,    // 10 miles in metres
  fillColor: '#AA0000'
});
circle.bindTo('center', beachMarker, 'position');


// clicable labe starts
	 var contentString = '<div id="content">'+'Welcome! You are Here Now</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  
  beachMarker.addListener('click', function() {
    infowindow.open(map, beachMarker);
  });
//clickable lbel ends.
}




//------------------------------------------------------------------------------
function initMap(e) {
	var unit='M';
	var length = Object.keys(e).length;
	var userdist='';
//if(myraddist!='') { userdist=myraddist;  alert(myraddist+' Mile Radius'); } else { userdist=20; alert(userdist+' Mile Radius');  }	
if(myraddist!='') { userdist=myraddist;   } else { userdist=20;   }	
	
if(userlat!='' && userlng!='') {  
    var latorg=userlat;
	var lngorg=userlng;
	var myLatLng = new google.maps.LatLng(latorg, lngorg);
	var msgbyid='<div id="content">'+'Target Patient Location<br>'+e[centeruserid].First_Name+' '+e[centeruserid].Last_Name+'</div>';
} else {
	
	var latorg=$('#mylat').val();
	var lngorg=$('#mylng').val();
	var myLatLng = new google.maps.LatLng(latorg, lngorg);
	var msgbyid='<div id="content">'+'Target Patient Location. Radius: '+userdist+'</div>';
}
	
  var map = new google.maps.Map(document.getElementById('map2'), {
    zoom: 10,
	 center: myLatLng,
   zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: true,
	 streetViewControl: true,
	 mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_CENTER
    },

  }); 
    
//var listrinfo=[149,150,156];
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
for (var i = 0; i < e.length; i++) {	

     for (var t=0; t < mapinfo.length; t++) {
           // if(e[i].id==mapinfo[t] && userdist>distance(e[i].lat, e[i].lng, latorg, lngorg, unit))  {
				 if(e[i].id!=mapinfo[t])  {
	
if(e[i].Type=='Nurse') { image = 'UI/images/icons/black/nursemap.png'; } else  { image = 'UI/images/icons/black/patientmap.png'; }
 marker = new google.maps.Marker({
     position: new google.maps.LatLng(e[i].lat, e[i].lng),
    map: map,
	 draggable: true,
    icon: image,
 title: "Witness"
  }); 

google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('<img src="UI/images/deepic.jpg" style="border-radius:50%;width:50px;height:50px" ><br>'+disttt+e[i].First_Name+' '+e[i].Last_Name+' ('+e[i].Type+')');
          infowindow.open(map, marker);
        }
      })(marker, i));
	                                 } 
	                              }
                                }
 // marker with circle radius start
  var image2 = 'UI/images/icons/black/usermarker.png';
  var beachMarker = new google.maps.Marker({
     position:  myLatLng,
     map: map,
	 draggable: true,
    icon: image2,
 title: "Witness"
  });
 
 
  var radius=1609.34*userdist;
  var circle = new google.maps.Circle({
  map: map,
  radius: radius,    // 10 miles in metres
  fillColor: '#AA0000'
});
circle.bindTo('center', beachMarker, 'position');

 var contentString2 = msgbyid;
 var infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });
  
  beachMarker.addListener('click', function() {
    infowindow2.open(map, beachMarker);
  });
  // marker with circle radius end 
}


//------------------------------------------------------------------------------
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

//});