function checkTime(m) {
	if (m < 10) 
		m = "0" + m	// add zero in front of minutes < 10
	return m
}
function start() {
	var today = new Date()
	var h = today.getHours()
    var m = today.getMinutes()
    var s = today.getSeconds()
    var date = new Date;
    var annee = date.getFullYear();
    var moi = date.getMonth();
    var j = date.getDate();
    var jour = date.getDay();
    mois = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
    jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');

	//clean both sources
    h = checkTime(h)	//add leading 0 for minutes > 10
    m = checkTime(m)	//add leading 0 for minutes > 10
    s = checkTime(s)	//add leading 0 for minutes > 10

	//write time to screen
    document.getElementById('date').innerHTML = jours[jour]+' '+j+' '+mois[moi]+' '+annee
    document.getElementById('heure').innerHTML = h + ":" + m
    document.getElementById('seconds').innerHTML = s
	//Since we aren't printing seconds, we can wait longer to call the function again
    var t = setTimeout(start, 1*1000) //every 1 seconds
}

var _hide_details = false
var count = 0

//hides details when toggled
function toggle(){
	//console.log(":toggle initiated:")
	var info = document.getElementById('info');
	
	//toggle the state
	if(_hide_details == false)
		_hide_details = true
	else
		_hide_details = false
	
	
	//if true and if the counter is even, hide info
	if(_hide_details == true && count%2==0){
		info.style.display = 'none'
		//console.log("Hiding Info")
	}
	else{
		info.style.display = 'block'
		//console.log("Showing Info")
	}
		
	
	count++
	//console.log(":complete:"+_hide_details)
}