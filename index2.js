var ms = 0
var kmh = 0

function updatetest(ele) {
	id = ele.id
  if(id == "speedms"){
  ms = document.querySelector("#speedms").value * 1.0;
  kmh = ms * 3.6
  document.getElementById("speedkmh").value = kmh
  }
  else{
  kmh = document.querySelector("#speedkmh").value * 1.0;
  ms = kmh / 3.6
  document.getElementById("speedms").value = ms
  }
  document.getElementById("test-id").innerHTML = kmh + " km/h";
}

function updatebreak(){
	breakforce = document.querySelector("#breakforce").value * 1.0;
  slope = document.querySelector("#slope").value * 1.0;
  slope = slope * (Math.PI/180)
  break_res = breakforce + 9.81 * Math.sin(slope)
  if (!ms || !break_res){return}
  distance = ms ** 2 / (2*break_res)
  document.getElementById("breakage").innerHTML = distance+ " m";
}
