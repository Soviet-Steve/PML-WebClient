// Setting a higher initial zoom to make effect more obvious
const mymap = L.map('PMLmap').setView([-32.55, 151.45], 6);
// const tileUrl = './assests/maptiles/{z}/{x}/{y}.png';
// const tileUrl = './assests/newcastleMaping/{z}/{x}/{y}.png';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl/*, {maxZoom: 14}*/);
tiles.addTo(mymap);

// Making a marker with a custom icon
const cowIcon = L.icon({
    iconUrl: 'assests/cow.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

const farmerIcon = L.icon({
    iconUrl: 'assests/farmer.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

const bikerIcon = L.icon({
    iconUrl: 'assests/biker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

function iconChooser(input){
    switch(input){
        case "Cow Tag":
            return cowIcon;
        case "Farmer Tag":
            return farmerIcon;
        case "Bike Tag":
            return bikerIcon;
        default:
            return null;
    }
}



var comms = [ // 0 ref, 1 ID, 2 has message, 3 lat, 4 lng, 5 time, 6 message
    [2, 2, false, -32.84, 151.705, "2021-01-13 00:50:57", null],
    [3, 6, false, -32.8924, 151.704, "2021-01-13 00:50:57", null]
]

var info = [ // 0 ID, 1 Name, 2 in use, 3 type
    [2, "Daisy", true, "Cow Tag"],
    [6, "Andrew", true, "Bike Tag"]
]



// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function(){
//     if(this.readyState == 4 && this.status == 200){
//         var myObj = JSON.parse(this.responseText);
//         for(var i = 0; i < myObj.length; i++){
//             switch(myObj[i].length){
//                 case 4:
//                     info[info.length] = myObj[i];
//                     break;
//                 case 7:
//                     comms[comms.length] = myObj[i];
//                     break;
//                 default:
//             }
//         }
//     }
//     console.log(info);
// }

// xhr.open("GET", "./php/fetchDatabase.php", true);
// xhr.send();

let firstTime = true;
async function fetchData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './php/fetchDatabase.php', true)
    xhr.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            var myObj = JSON.parse(this.responseText);
            info = [];
            comms = [];
            for(var i = 0; i < myObj.length; i++){
                switch(myObj[i].length){
                    case 4:
                        info[info.length] = myObj[i];
                        break;
                    case 7:
                        comms[comms.length] = myObj[i];
                        break;
                    default:
                }
            }

            var activeTags = [];
            for(var i = 0; i < info.length; i++){
                if(info[i][2] == 1){
                    activeTags.push(info[i]); // This disables tracking the tag if the flag is not set
                }
            }



            var items = []; // 0 Name, 1 ID, 2 Lat, 3 Lng, 4 time, 5 type

            for(var i = 0; i < activeTags.length; i++){
                items.push([activeTags[i][1], activeTags[i][0], /*lat*/, /*lng*/, /*time*/ , activeTags[i][3]]); // This creates the array that that map relies on
            }



            for(var i = 0; i < comms.length; i++){
                for(var j = 0; j < items.length; j++){
                    if(comms[i][1] == items[j][1]){
                        items[j][2] = comms[i][3];
                        items[j][3] = comms[i][4];
                        items[j][4] = comms[i][5];
                    }
                }
            }

            for(var i = 0; i < items.length; i++){
                marker = new L.marker([items[i][2],items[i][3]], { icon: iconChooser(items[i][5])})
                            .bindPopup(items[i][0] + "<br>Lat: " + items[i][2] +"<br>Lng: " + items[i][3] + "<br>Last updated: " +items[i][4] + "<br>Tag ID: " +items[i][1])
                            .addTo(mymap);
            }
            console.log(info);
        }
    }
    xhr.send();
}
fetchData();
setInterval(fetchData, 10000);

