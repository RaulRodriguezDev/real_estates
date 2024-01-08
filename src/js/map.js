(function() {
    const lat = document.querySelector('#lat').value || 19.4972343
    const lng = document.querySelector('#lng').value || -99.1484094
    const map = L.map('map').setView([lat, lng ], 16)
    let marker

    const geocodeService = L.esri.Geocoding.geocodeService()
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    marker = new L.marker([lat, lng],{
        draggable: true,
        autoPan: true
    }).addTo(map)

    marker.on('moveend', function(e){

        marker = e.target
        const position = marker.getLatLng()

        map.panTo(new L.LatLng(position.lat, position.lng))

        geocodeService.reverse().latlng(position, 16).run(function(error, result){
            const {address, latlng: location} = result

            const popupMessage = `${address.Address} <br/> ${address.City}`
            marker.bindPopup(popupMessage).openPopup()

            document.querySelector('.street').textContent = address?.Address ?? ''
            document.querySelector('#street').value = address?.Address ?? ''
            document.querySelector('#lat').value = location.lat ?? ''
            document.querySelector('#lng').value = location.lng ?? ''
        })

        
    })

    

})()