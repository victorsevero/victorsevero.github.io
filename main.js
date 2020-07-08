var xhttp = new XMLHttpRequest();
var user_in = document.getElementById("input");
var entry = document.getElementById("entry");
var table = document.getElementById("log");
var currentRow = document.querySelector("tr");

var tdCount = 0;



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

function reset_entry(){
    user_in.classList.toggle("correct"); //Set input background to green(enable "correct" class)
        user_in.classList.toggle("input-pokemon");//Disable gray input background(disable "input-pokemon" class)
        new_entry();
        setTimeout(function(){//set delay to restore the initial buttons classes with fade animation
            user_in.classList.toggle("correct");
            user_in.classList.toggle("input-pokemon");}
        ,200);
        user_in.value = "";
}
//Working on log feature
function add_to_table(pokemon){
    if(tdCount > 8){
        currentRow = document.createElement('tr');
        table.appendChild(currentRow);
        let newTr = document.createElement('td');
        currentRow.appendChild(newTr);
        newTr.innerText = pokemon.toUpperCase();
        tdCount = 0;
    }
    else {
        let newTr = document.createElement('td');
        currentRow.appendChild(newTr);
        newTr.innerHTML = pokemon.toUpperCase();
        tdCount++;
    }
}

user_in.addEventListener("input", function(){
    // toDo: maybe add "\u0300-\u036f" w/ NFD normalize func to ignore accentuation, i haven't decided it yet
    if (user_in.value.replace("\u0027", "\u2019").toLowerCase() == rnd_poke.replace(/[\u2640\u2642]/g, "").toLowerCase()){
        add_to_table(user_in.value);
        reset_entry();
    }
});

