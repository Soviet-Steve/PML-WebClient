// Setting a higher initial zoom to make effect more obvious
const mymap = L.map('PMLmap').setView([-32.55, 151.45], 6);
// const tileUrl = './assests/maptiles/{z}/{x}/{y}.png';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {maxZoom: 10});
tiles.addTo(mymap);
// Making a marker with a custom icon
const cowIcon = L.icon({
    iconUrl: 'assests/cow.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});
let marker = L.marker([0, 0], { icon: cowIcon }).addTo(mymap);
marker.setLatLng([-32.55, 151.45]);
const popupDemo = "<b>This is a demo of a popup</b><br>I can show info like lat-lng<br>Lat: -32.55<br>Lng: 151.45";
marker.bindPopup(popupDemo);
// var popup = L.popup()
// .setLatLng([-32.55, 151.45])
// .setContent("henlo")
// .openOn(mymap);
marker.setLatLng([-32.55, 151.45]);
let firstTime = true;
async function cowLocation() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetchDatabase.php', true)
    xhr.onload = function(){
        
    }
    xhr.send();
}
cowLocation();
setInterval(cowLocation, 1000);