/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const leaflet =() =>{

    // let initialCoordinates = [-22.91, -43.20];
    // let initialZoomLevel = 16;
    // let map = L.map('map').setView(initialCoordinates, initialZoomLevel);
    // let muxiIconProperties = {
    //     iconUrl: "../assets/img/map-maker.png"
    // };

    // const osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    // console.log(osm);
    // map.addLayer(osm);
    // fetch('../assets/img/map-qa.kml')
    // .then(res => res.text())
    // .then(kmltext => {
    //     // Create new kml overlay
    //     const parser = new DOMParser();
    //     const kml = parser.parseFromString(kmltext, 'text/xml');
    //     const track = new L.KML(kml);
    //     map.addLayer(track);

    //     // Adjust map to show the kml
    //     const bounds = track.getBounds();
    //     map.fitBounds(bounds);
    // });




	const map = L.map('map').setView([-3.71839, -38.54342], 12);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

        // const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        //     minZoom: 3,
        //     maxZoom: 20,
        //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        //     attribution: '&copy; <a href="https://cloud.google.com/maps-platform/terms/">Google</a> contributors',
        // });

    const circleCcd = L.circle([-3.7192225, -38.51417], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 500
	}).addTo(map);
    const circleSiquera = L.circle([-3.7899023034813, -38.5868264581879], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 500
	}).addTo(map);
	// const marker = L.marker([-3.7192225, -38.51417]).addTo(map);
	// const markerPoint = L.marker([-3.7192225, -38.51417]).addTo(map);



	// const polygon = L.polygon([
	// 	[51.509, -0.08],
	// 	[51.503, -0.06],
	// 	[51.51, -0.047]
	// ]).addTo(map);

    const conversaoParseCol = (elementCol) =>{
        const co2ColSiq = document.querySelectorAll(elementCol);
        let choiceOne;
        if (co2ColSiq){
            for (let i = 0; i < co2ColSiq.length; i++) {
                const element = co2ColSiq[2];
                const convNumber = parseFloat(element.innerHTML) * 1000;
                const convToFixed = convNumber.toFixed(3);
                return convToFixed;
            }
        }
    }
    ;
    
    const o3ColValueSiq =  conversaoParseCol('#o2ColSiqueira');
    const co2ValueSiq = conversaoParseCol('#co2ColSiqueira');
    const o2ColValueCcd =  conversaoParseCol('#o2ColCcd');
    const co2ValueCcd = conversaoParseCol('#co2ColCcd');
    const arrayCo2 = [10,12,14,16,50];
    const arrayO3 = [100,130,160,200,800];
    const co2description = `O monóxido de carbono é um gás altamente tóxico, 
    com o limite de tolerância de 39 ppm em jornadas de trabalho de até 48 horas/semana, segundo a NR-15.`
    const checkElement = (local, elementName, elementSimbolo, elementDescription, elementValue, arrayElements, arrayEl, elementO3Value) =>{

        let nValue;
        if(elementValue < arrayElements[0]) nValue =`<b>NÍVEL N1</b> - qualidade boa 🤩`;
        if(elementValue > arrayElements[0] && elementValue < arrayElements[1]) nValue = `<b>NÍVEL N2</b> - qualidade Moderada 😀`;
        if(elementValue > arrayElements[1] && elementValue < arrayElements[2]) nValue = `<b>NÍVEL N3</b> - qualidade Ruim 🤨`;
        if(elementValue > arrayElements[2] && elementValue < arrayElements[3]) nValue = `<b>NÍVEL N4</b> - Muito Ruim 🙁`;
        if(elementValue > arrayElements[3] && elementValue < arrayElements[4]) nValue = `<b>NÍVEL N5</b> - Péssima 😡`;
        if(elementValue > arrayElements[4]) nValue = `<b>NÍVEL N5</b> - Péssima 😡`;

        let o3value;
        if(elementO3Value < arrayO3[0]) o3value =`<b>NÍVEL N1</b> - qualidade boa 🤩`;
        if(elementO3Value > arrayO3[0] && elementO3Value < arrayO3[1]) o3value = `<b>NÍVEL N2</b> - qualidade Moderada 😀`;
        if(elementO3Value > arrayO3[1] && elementO3Value < arrayO3[2]) o3value = `<b>NÍVEL N3</b> - qualidade Ruim 🤨`;
        if(elementO3Value > arrayO3[2] && elementO3Value < arrayO3[3]) o3value = `<b>NÍVEL N4</b> - Muito Ruim 🙁`;
        if(elementO3Value > arrayO3[3] && elementO3Value < arrayO3[4]) o3value = `<b>NÍVEL N5</b> - Péssima 😡`;
        if(elementO3Value > arrayO3[4]) o3value = `<b>NÍVEL N5</b> - Péssima 😡`;

        let blocoTexto = 
        `
        <h2 id="localPopUp"style="font-size:2.0rem;">${local}</h2>
        <br>
        <b>${elementSimbolo}/m3 - ${elementValue}</b> 
        <p style="font-size:1.0rem">${nValue}</p>
        <p> ${elementName} - ${elementDescription}</p>
        <hr style=" border-bottom:1px solid #b2b2b2;"/>
        <b>O3/m3 - ${elementO3Value}</b> 
        <p style="font-size:1.0rem">${o3value}</p>
        <p> Ozônio - O ozônio (O3) é um dos gases que compõe a atmosfera e cerca de 90% de suas moléculas se concentram entre 20 e 35 km de altitude</p>
        `;
        return blocoTexto;
    }

    circleSiquera.bindPopup(checkElement('Siqueira', 'Monóxido de Carbono','CO', co2description, co2ValueSiq, arrayCo2, arrayO3, o3ColValueSiq )).openPopup();
    circleCcd.bindPopup(checkElement('CCD', 'Monóxido de Carbono','CO', co2description, co2ValueSiq, arrayCo2, o2ColValueCcd, o2ColValueCcd ));
    
    // const popup = L.popup()
    // .setLatLng([51.513, -0.09])
    // .setContent("I am a standalone popup.")
    // .openOn(map);

    // function onMapClick(e) {
    //     console.log(e.latlng);
    // }

    // map.on('click', onMapClick);




}

export { leaflet };