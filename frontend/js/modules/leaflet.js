/* eslint-disable no-undef */
const leaflet =() =>{

    let initialCoordinates = [-22.91, -43.20];
    let initialZoomLevel = 16;
    // let muxiIconProperties = {
    //     iconUrl: "img/map-maker.png"
    // };

    let map = L.map('map').setView(initialCoordinates, initialZoomLevel);

    const osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(osm);
    fetch('../assets/img/wifor-map.kml')
    .then(res => res.text())
    .then(kmltext => {
        // Create new kml overlay
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmltext, 'text/xml');
        const track = new L.KML(kml);
        map.addLayer(track);

        // Adjust map to show the kml
        const bounds = track.getBounds();
        map.fitBounds(bounds);
    });


}

export { leaflet };