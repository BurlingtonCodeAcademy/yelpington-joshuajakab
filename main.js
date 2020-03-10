
let listContainer = document.getElementById('restaurant-list')

/*------------------Adds the map---------------------------------------*/

let myMap = L.map('map').setView([44.4780344,-73.2141866], 16);
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

/*------------------Function to add all markers------------------------*/

async function getAddress() {
    let info = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((data) => {
            return data.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })
        info.forEach((restaurant) => {
            getLatLon(restaurant.address)
            
        })

        async function getName() {
            let info = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((data) => {
            return data.json()
        })
        .then((jsonObj) => {
            return jsonObj
            
        })
        info.forEach((restaurant) => {
        marker.bindPopup("restaurant.name").openPopup();
        })
        }

    async function getLatLon(address) {
        let latLon = await fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
            .then((data) => {
                return data.json()
            })
            .then((locInfo) => {
                
                let info = locInfo[0]
                let lat = info.lat
                let lon = info.lon
                let marker = L.marker([lat, lon]).addTo(myMap)
                
            })
        
    }
}

/*------------------------------Add pop-up to markers--------------------*/



/*----------------------------List o' restaurants------------------------*/

async function makeList() {
    let info = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((data) => {
            return data.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })


    info.forEach((restaurant) => {
        let id = restaurant.id;
        let name = restaurant.name;
        let address = restaurant.address;
        listContainer.innerHTML += `<li><a href="./restaurant.html"><b>${name}<br>${address}</b></a></li>`
    })
}









