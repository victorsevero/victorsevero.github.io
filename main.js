var xhttp = new XMLHttpRequest();
var user_in = document.getElementById("input");
var entry = document.getElementById("entry");


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let json = JSON.parse(xhttp.responseText);
       return json
    }
};
xhttp.open("GET", "./poke_entries.json", false);
xhttp.send(null);

var json = JSON.parse(xhttp.responseText);
rnd_poke = new_entry();


function randomProperty(obj){
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};


function new_entry(){
    rnd_poke = randomProperty(json);
    rnd = json[rnd_poke].length * Math.random() << 0;
	entry.innerHTML = json[rnd_poke][rnd];
	return rnd_poke
};


user_in.addEventListener("input", function(){
    if (user_in.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == rnd_poke) {
        new_entry();
        user_in.value = "";
    }
});