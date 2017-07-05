//просьба не увлек-ся поиском ошибок, ибо работа  дотнетчика)

	var ms = 0;
	var n = 1;
	var timerId;
	var msec = 0;
	var control = 0;
	var tempms = 0;
	var Salaries = 0;
	class PackInfo{
		constructor(description, kfimg, countimg, time){
			this.description = description;
			this.time = time;
			this.kfimg = kfimg;
			this.countimg = countimg;
		}
		GetDescription(){
			return this.description;
		}		
		GetKF(){
			return this.kfimg;
		}	
		GetCountImgInPack(){
			return this.countimg;
		}
		GetTime(){
			return this.time;
		}
	}
	var TimesList = [];
	function Click()
	{
	    	if (control == 0)
		{		
			timerId = setInterval(EventTimer, 10);
			document.getElementById("im").src = "stop.svg";
			control = 1;
		}
		else
		{
			document.getElementById("im").src = "play.svg";
			clearTimeout(timerId);
			n++;
			var	tkf;
			var tcountimg;
			if (document.getElementById("kfref").value == null) {tkf=0;} 
			else{tkf=document.getElementById("kfref").value;}
			if (document.getElementById("countinpack").value == null) {tcountimg=0;} 
			else{tcountimg=document.getElementById("countinpack").value;}
			var TPackInfo = new PackInfo(document.getElementById("edit").value, +tkf, +tcountimg, +ms);
			TimesList.push(TPackInfo);
			control = 0;
			tempms=msec;
			WriteColl();
			ms=0;
			document.getElementById("nowtime").innerHTML = "0:00:00:000";
			if (document.getElementById("kfref").value == null) {alert('0')}
			Salaries += CalculationSalaries(TPackInfo.GetKF(), 1, TPackInfo.GetCountImgInPack());
			document.getElementById("zp").innerHTML = Salaries.toFixed(2) + " $";
		}
	}
	function DClick(obj){
		msec-=+TimesList[obj.id].GetTime();
		tempms-=+TimesList[obj.id].GetTime();
		Salaries -= CalculationSalaries(TimesList[obj.id].GetKF(), 1, TimesList[obj.id].GetCountImgInPack());
		document.getElementById("zp").innerHTML = Salaries.toFixed(2) + " $";
		document.getElementById("alltime").innerHTML = ConvertToTimeString(msec);	
		TimesList.splice(obj.id, 1); //delete record in array
		n--;
		ReTable();
		document.getElementById("kf").innerHTML = parseFloat(((tempms/1000)/(n-1))).toFixed(2);
		if (n==1) {
			document.getElementById("count").innerHTML = 0;
			document.getElementById("kf").innerHTML = 0;
		}
		if ((document.getElementById("kfref").value == null)||(document.getElementById("countinpack").value == null)) {alert('0')}
	}

	function DeleteCell(id){
		var r = document.getElementById("d"+(+id+2));
		r.deleteCell(3);
		r.deleteCell(2);
		r.deleteCell(1);
		r.deleteCell(0);
	}
	function ReTable(){
		for (var i = 0; i < n; i++) {
			DeleteCell(i);
		}
		n=1;
		for (var i = 0; i < TimesList.length; i++) {
			n++;
			WriteColl();
		}
	}
	function WriteColl(){
			var t = document.getElementById("tabledata");
			var row = t.insertRow(1);
			row.id="d"+n;
			var cell = row.insertCell(0);
			cell.innerHTML = n-1;
			cell.align="center";
			cell = row.insertCell(1);
			cell.innerHTML = TimesList[n-2].GetDescription();
			cell.align="center";
			cell = row.insertCell(2);
			cell.innerHTML = ConvertToTimeString(TimesList[n-2].GetTime());
			cell.align="center"
			cell = row.insertCell(3);
			cell.innerHTML = '<p id ="'+(n-2)+'" onclick="DClick(this)"><img id="im" src="cross.svg" width="20" height="20" /> </p>';
			document.getElementById("title").innerHTML = n-1;
			document.getElementById("count").innerHTML = n-1;
			document.getElementById("kf").innerHTML = parseFloat(((msec/1000)/(n-1))).toFixed(2);
	}

	function CalculationSalaries(kfref, countimg, countimginpack){
		return kfref*countimg*countimginpack*0.06/120;
	}

	function ConvertToTimeString(msec){
		var time = new Date();
		time.setTime(msec);
		time.setHours(msec/3600000);

		var stringtime = time.getHours() + ':';	
		if (time.getMinutes() < 10) {
			stringtime += "0" + time.getMinutes()+ ':';
		}
		else
		{
			stringtime += time.getMinutes()+ ':';
		}
		
		if (time.getSeconds() < 10) {
			stringtime += "0" + time.getSeconds() + ':';
		}
		else
		{
			stringtime += time.getSeconds() + ':';
		}

		if (time.getMilliseconds() < 10) {
			stringtime += "00" + time.getMilliseconds();
		}
		else
		{
				if (time.getMilliseconds() < 100) 
				{
					stringtime += "0" + time.getMilliseconds();
				}
				else
				{
					stringtime += time.getMilliseconds();
				}
		}

		return stringtime;
	}

	function EventTimer(){
		ms+=10;
		msec+=10;
		var stringtime = ConvertToTimeString(ms);
			document.getElementById("alltime").innerHTML = ConvertToTimeString(msec);	
			document.getElementById("nowtime").innerHTML = stringtime;
	}

