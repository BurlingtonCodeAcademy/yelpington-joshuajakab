
let restContainer = document.getElementById('chosen-restaurant')
let id = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);


//------------------------------------Add the Map-------------------------------------//
let secondMap = L.map('rest-map').setView([44.4780344, -73.2141866], 16);
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(secondMap);

//------------------------------------Gone Fetchin'------------------------------------//

async function getAddress() {
   
    let info = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/`)
        .then((data) => {
            return data.json()
        })
        .then((jsonObj) => {
            for(let obj of jsonObj){
                if(obj.id === id) {
                    document.getElementById('chosen-restaurant').innerHTML = `<li><div id="name">${obj.name}</div></li></br><li>${obj.address}</li></br><li>${obj.phone}</li></br><li><a href='${obj.website}'>${obj.website}</a></li></br><li>${obj.hours}</li></br><li>Comments: ${obj.notes}</li>`
                    getLatLon(obj.address, obj.name)
                }
            }
           
        })
        
        
    }
  
    async function getLatLon(address, name) {
        let latLon = await fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
            .then((data) => {
                return data.json()
            })


            .then((locInfo) => {

                let info = locInfo[0]
                let lat = info.lat
                let lon = info.lon
                let marker = L.marker([lat, lon]).addTo(secondMap)

                marker.bindPopup(`${name}</br>${address}`).openPopup();
            })

    }



