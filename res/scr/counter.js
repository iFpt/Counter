//https://github.com/AndryhaArapchik/Counter
	var ms = 0;
	var n = 1;
	var ReportLinkNum = 0;
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
		window.resizeTo(500,300);
	    if (control == 0)
		{		
			timerId = setInterval(EventTimer, 10);
			document.getElementById("im").src = "res/img/stop.svg";
			control = 1;
		}
		else
		{
			document.getElementById("im").src = "res/img/play.svg";
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
			var target = +document.getElementById("money").value;
			var	stat = (100 * Salaries)/target;
			document.getElementById("progr").style.width = SetProgr(235,stat);
			document.getElementById("status").innerHTML = stat.toFixed(2)+"%";
		}
	}
	function DClick(obj){
		msec-=+TimesList[obj.id].GetTime();
		tempms-=+TimesList[obj.id].GetTime();
		Salaries -= CalculationSalaries(TimesList[obj.id].GetKF(), 1, TimesList[obj.id].GetCountImgInPack());
		document.getElementById("zp").innerHTML = Salaries.toFixed(2) + " $";
		var target = document.getElementById("money").value;
		var	stat = (100 * Salaries)/target;
		document.getElementById("progr").style.width = SetProgr(235, stat);
		document.getElementById("status").innerHTML = stat.toFixed(2)+"%";
		document.getElementById("progr").style.width = SetProgr(235,(100 * Salaries)/target);
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
	function SetProgr(width, value){
		var pos = 0;
		pos = (width/100) * value;
		if (pos >= width) {
			pos = width;
		}
		if (pos <= 0) {
			pos = 0;
		}
		return pos;
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
			cell.innerHTML = '<p id ="'+(n-2)+'" onclick="DClick(this)"><img id="im" src="res/img/cross.svg" width="15" height="15" /> </p>';
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


	function GetReport(){
		document.getElementById("tablework").setAttribute("hidden", true);
		document.getElementById("tablereport").removeAttribute("hidden");

		var Tasks = [];
		class infolinks{
			constructor(description, kf, countimginpack, countpacks, zp, time, kfimg){
				this.description = description;
				this.time = time;
				this.kfimg = kfimg;
				this.countimginpack = countimginpack;
				this.countpacks = countpacks;
				this.zp = zp;
				this.kf = kf;
			}
			GetDescription(){
				return this.description;
			}		
			GetKF(){
				return this.kfimg;
			}	
			GetCountImgInPack(){
				return this.countimginpack;
			}
			GetTime(){
				return this.time;
			}
			GetCountPacks(){
				return this.countpacks;
			}	
			GetZp(){
				return this.zp;
			}	
			GetKFLink(){
				return this.kf;
			}	
			GetTextInfo(){
				var result = "";
				result += "description: " + this.description + '\n';
				result += "kfimg: " + this.kfimg + '\n';
				result += "countimginpack: " + this.countimginpack + '\n';
				result += "time: " + this.time + '\n';
				result += "countpacks: " + this.countpacks + '\n';
				result += "kf: " + this.kf + '\n';
				result += "zp: " + this.zp + '\n';
				return result;
			}
		}

		var tempstr = [];
		for (var i = 0; i < TimesList.length; i++) {
			if (!tempstr.includes(TimesList[i].GetDescription())) {
				tempstr.push(TimesList[i].GetDescription());
			}
		}
		var t = document.getElementById("report");
		for (i=document.getElementById("report").tBodies[0].rows.length-1; i>=1; i--) {
			document.getElementById("report").tBodies[0].deleteRow(i);
		}

		for (var i = 0; i<tempstr.length; i++) {
			var PacksInLink = GetPacksAtDescription(tempstr[i]);
			var TimeWorkOnLink = 0;
			var tempzp = parseFloat(PacksInLink.length * (CalculationSalaries(PacksInLink[0].GetKF(), 1, 
				PacksInLink[0].GetCountImgInPack()))).toFixed(3);
			for (var j = 0; j < PacksInLink.length; j++) {
				TimeWorkOnLink+=PacksInLink[j].GetTime();
			}
			var Link = new infolinks(tempstr[i], PacksInLink[0].GetKF(), PacksInLink[0].GetCountImgInPack(),
			 PacksInLink.length, tempzp, TimeWorkOnLink, parseFloat(((TimeWorkOnLink/1000)/(PacksInLink.length))).toFixed(2));

			var t = document.getElementById("report");
			var row = t.insertRow(1);
			ReportLinkNum = tempstr.length - i;
			var cell = row.insertCell(0);
			cell.innerHTML = ReportLinkNum;
			cell.align="center";
			cell = row.insertCell(1);
			cell.innerHTML = Link.GetDescription();
			cell.align="center";
			cell = row.insertCell(2);
			cell.innerHTML = Link.GetKFLink();
			cell.align="center";
			cell = row.insertCell(3);
			cell.innerHTML = Link.GetCountImgInPack();
				cell.align="center";
			cell = row.insertCell(4);
			cell.innerHTML = Link.GetCountPacks();
				cell.align="center";
			cell = row.insertCell(5);
			cell.innerHTML = Link.GetTime() + " ("+ConvertToTimeString(Link.GetTime())+")";
				cell.align="center"
			cell = row.insertCell(6);
			cell.innerHTML = Link.GetKF();
				cell.align="center"
			cell = row.insertCell(7);
			cell.innerHTML = Link.GetZp();
			cell.align="center"
			document.getElementById("title").innerHTML = n-1;
			document.getElementById("count").innerHTML = n-1;
			document.getElementById("kf").innerHTML = parseFloat(((msec/1000)/(n-1))).toFixed(2);
		}
	}

function GetPacksAtDescription(description){
	var ListPacks = [];
	for (var i = 0; i < TimesList.length; i++) {
		if (description == TimesList[i].GetDescription()) {
			ListPacks.push(TimesList[i]);
		}
	}
	return ListPacks;
}
function ShowWorkTable(){
		document.getElementById("tablereport").setAttribute("hidden", true);
		document.getElementById("tablework").removeAttribute("hidden");
}
