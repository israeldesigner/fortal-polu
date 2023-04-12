/* eslint-disable use-isnan */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const leaflet =() =>{


	const map = L.map('map').setView([-3.71839, -38.54342], 12);
	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

    let base_url = window.location.origin;

    const arrayCo2 = [10,12,14,16,50];
    const arrayO3 = [100,130,160,200,800];
    const co2description = `O monóxido de carbono é um gás altamente tóxico, 
    com o limite de tolerância de 39 ppm em jornadas de trabalho de até 48 horas/semana, segundo a NR-15.`
    let nText = 'Nível';
    let nValue;
    let o3Text;
    let no2Text;
    let pm10Text;
    let coPpmmText;
    let colorForPm2;
    let colorMarkerPm2;
    let blocoTexto;
    let markerPoint;
    const _radius = 250;
    const _fillOpacity = 0.5;
    
    const fetchApiData = async () => {
        let methodsFetc = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try{
            let response = await fetch(`${base_url}/api_excel`, methodsFetc);
            let responseData = await response.json()
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            
            const getPointsData = () =>{
                let arrayLastItems =[]
                for (const key in responseData) {
                    if (Object.hasOwnProperty.call(responseData, key)) {
                        const element = responseData[key];
                        console.log(element)
                        let lastElement = element[element.length -1];

                        let _pLocal = lastElement.Local;
                        let _latitude = lastElement.Latitude;
                        let _longitude = lastElement.Longitude;
                        let _humidity = lastElement.Humidity;
                        let _coppm = lastElement.COppm;
                        let _pm2ug = lastElement.PM2ug;
                        let _pm10ug = lastElement.PM10ug;
                        let _exTmp = lastElement.ExTemp;
                        let _no2ug = lastElement.NO2ug;
                        let _o3ug = lastElement.O3ug;

                        const arrayLatLong = [lastElement.Latitude, lastElement.Longitude];
                        const _arrayIndicesPm2u  = [7, 50, 75, 125, 300];
                        const _arrayIndicesO3    = [100,130,160,200,800];
                        const _arrayIndicesPm10  = [50,100,150,250,600];
                        const _arrayIndicesCoppm = [10, 12, 14, 16, 50];
                        const _arrayIndicesNo2   = [200,240,320,1130,3750];
                        const _arraySymbols      = ['PM2.5','PM10','CO' ,'NO2','O3'];
                        const _arrayElements     = [_pm2ug, _pm10ug, _coppm, _no2ug, _o3ug];
                        const objectTestEl = { 
                            pLocal:_pLocal,
                            humidity: _humidity,
                            coppm:_coppm,
                            pm2ug:_pm2ug,
                            pm10ug:_pm10ug,
                            exTmp:_exTmp,
                            no2ug:_no2ug,
                            o3ug:_o3ug
                        }
                        
                        const cheElementsInd = (elementValue, arrayElements, elementName, elementLocal) =>{
                            if(elementValue < arrayElements[0]) {
                                nValue =`
                                <div class="d-flex">
                                    <b>N1 - Bom </b> <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                </div>`;
                                colorForPm2 = { color:'Green', fillColor: '#adff2f',fillOpacity: _fillOpacity, radius: _radius };
                                colorMarkerPm2 = { iconUrl: './assets/img/Boa.png', iconRetinaUrl: './assets/img/Boa.png', className: 'testeClass', iconSize:  [40, 40]};
                            } 
                            if(elementValue > arrayElements[0] && elementValue < arrayElements[1]) {
                                nValue = `
                                <div class="d-flex">
                                    <b>N2 - Moderada </b> <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div> `;
                                colorForPm2 = { color:'yellow', fillColor: '#ffc801',fillOpacity: _fillOpacity, radius: _radius };
                                colorMarkerPm2 = { iconUrl: './assets/img/Moderada.png', iconRetinaUrl: './assets/img/Moderada.png', className: 'testeClass', iconSize:  [40, 40]};
                            }
                            if(elementValue > arrayElements[1] && elementValue < arrayElements[2]) {
                                nValue = `
                                <div class="d-flex">
                                    <b>N3 - Ruim </b> <img src="./assets/img/Ruim.png" class="leaflet-nvalue" alt="imagem qualidade ruim" />
                                </div>`;
                                colorForPm2 = { color:'orange', fillColor: '#ffcd03',fillOpacity: _fillOpacity, radius: _radius };
                                colorMarkerPm2 = { iconUrl: './assets/img/Ruim.png', iconRetinaUrl: './assets/img/Ruim.png', className: 'testeClass', iconSize:  [40, 40]};
                            }
                            if(elementValue > arrayElements[2] && elementValue < arrayElements[3]) {
                                nValue = `
                                <div class="d-flex">
                                    <b>N4</b> - Muito Ruim 
                                    <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade Muito ruim" />
                                </div>`;
                                colorForPm2 = { color:'red', fillColor: '#f03',fillOpacity: _fillOpacity, radius: _radius };
                                colorMarkerPm2 = { iconUrl: './assets/img/Muito-ruim.png', iconRetinaUrl: './assets/img/Muito-ruim.png', className: 'testeClass', iconSize:  [40, 40]};
                            }
                            if(elementValue > arrayElements[3] && elementValue < arrayElements[4]){
                                nValue = `
                                <div class="d-flex">
                                    <b>N5</b> - Péssima <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>`;
                                colorForPm2 = { color:'purple', fillColor: '#c904c9',fillOpacity: _fillOpacity, radius: _radius };
                                colorMarkerPm2 = { iconUrl: './assets/img/pessima.png', iconRetinaUrl: './assets/img/pessima.png', className: 'testeClass', iconSize:  [40, 40]};
                            } 
                            if(elementValue > arrayElements[4]) {
                                nValue = `
                                <div class="d-flex">
                                    <b>N5</b> - Péssima <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>`;
                                colorForPm2 = { color:'purple', fillColor: '#c904c9',fillOpacity: _fillOpacity, radius: _radius };
                                colorMarkerPm2 = { iconUrl: './assets/img/pessima.png', iconRetinaUrl: './assets/img/pessima.png', className: 'testeClass', iconSize:  [40, 40]};
                            };

                            if(_o3ug < _arrayIndicesO3[0]){
                                o3Text= `
                                <div class="d-flex">                                    
                                    <b>N1 - Bom</b>  <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                </div>
                                `
                            }
                            if(_o3ug > _arrayIndicesO3[0] && _o3ug < _arrayIndicesO3[1]) {
                                o3Text= `
                                <div class="d-flex">                                    
                                    <b>N2</b> - Moderada <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_o3ug > _arrayIndicesO3[1] && _o3ug < _arrayIndicesO3[2]) {
                                o3Text= `
                                <div class="d-flex">                                    
                                    <b>N3 - Ruim</b> <img src="./assets/img/Ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_o3ug > _arrayIndicesO3[2] && _o3ug < _arrayIndicesO3[3]) {
                                o3Text= `
                                <div class="d-flex">                                    
                                    <b>N4 - Muito ruim</b>  <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_o3ug > _arrayIndicesO3[3] && _o3ug < _arrayIndicesO3[4]) {
                                o3Text= `
                                <div class="d-flex">                                    
                                    <b>N5 Péssima</b> <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_o3ug > _arrayIndicesO3[4])  {
                                o3Text= `
                                <div class="d-flex">                                    
                                    <b>N5 - Péssima</b>  <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }

                            if(_no2ug < _arrayIndicesNo2[0]){
                                no2Text= `
                                <div class="d-flex">                                    
                                    <b>N1 - Bom</b>  <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                </div>
                                `
                            }
                            if(_no2ug > _arrayIndicesNo2[0] && _no2ug < _arrayIndicesNo2[1]) {
                                no2Text= `
                                <div class="d-flex">                                    
                                    <b>N2 - Moderada</b>  <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_no2ug > _arrayIndicesNo2[1] && _no2ug < _arrayIndicesNo2[2]) {
                                no2Text= `
                                <div class="d-flex">                                    
                                    <b>N3 - Ruim</b>  <img src="./assets/img/Ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_no2ug > _arrayIndicesNo2[2] && _no2ug < _arrayIndicesNo2[3]) {
                                no2Text= `
                                <div class="d-flex">                                    
                                    <b>N4 - Muito ruim</b>  <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_no2ug > _arrayIndicesNo2[3] && _no2ug < _arrayIndicesNo2[4]) {
                                no2Text= `
                                <div class="d-flex">                                    
                                    <b>N5 - Péssima</b>  <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_no2ug > _arrayIndicesNo2[4])  {
                                no2Text= `
                                <div class="d-flex">                                    
                                    <b>N5 - Péssima</b>  <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }

                            if(_pm10ug < _arrayIndicesPm10[0]){
                                pm10Text= `
                                <div class="d-flex">                                    
                                    <b>N1 - Bom </b>  <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                </div>
                                `
                            }
                            if(_pm10ug > _arrayIndicesPm10[0] && _pm10ug < _arrayIndicesPm10[1]) {
                                pm10Text= `
                                <div class="d-flex">                                    
                                    <b>N2 - Moderada</b>  <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_pm10ug > _arrayIndicesPm10[1] && _pm10ug < _arrayIndicesPm10[2]) {
                                pm10Text= `
                                <div class="d-flex">                                    
                                    <b>N3 - Ruim</b>  <img src="./assets/img/Ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_pm10ug > _arrayIndicesPm10[2] && _pm10ug < _arrayIndicesPm10[3]) {
                                pm10Text= `
                                <div class="d-flex">                                    
                                    <b>N4 - Muito Ruim</b>  <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_pm10ug > _arrayIndicesPm10[3] && _pm10ug < _arrayIndicesPm10[4]) {
                                pm10Text= `
                                <div class="d-flex">                                    
                                    <b>N5 - Péssima</b>  <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_pm10ug > _arrayIndicesPm10[4])  {
                                pm10Text= `
                                <div class="d-flex">                                    
                                    <b>N5 - Péssima</b>  <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade pessima" />
                                </div>
                                `
                            }

                            if(_coppm < _arrayIndicesCoppm[0]){
                                coPpmmText= `
                                <div class="d-flex">                                    
                                    <b>N1 - Bom </b>  <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                </div>
                                `
                            }
                            if(_coppm > _arrayIndicesCoppm[0] && _coppm < _arrayIndicesCoppm[1]) {
                                coPpmmText= `
                                <div class="d-flex">                                    
                                    <b>N2 - Moderada</b>  <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_coppm > _arrayIndicesCoppm[1] && _coppm < _arrayIndicesCoppm[2]) {
                                coPpmmText= `
                                <div class="d-flex">                                    
                                    <b>N3 - Ruim</b>  <img src="./assets/img/Ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_coppm > _arrayIndicesCoppm[2] && _coppm < _arrayIndicesCoppm[3]) {
                                coPpmmText= `
                                <div class="d-flex">                                    
                                    <b>N4 - Muito Ruim</b>  <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_coppm > _arrayIndicesCoppm[3] && _coppm < _arrayIndicesCoppm[4]) {
                                coPpmmText= `
                                <div class="d-flex">                                    
                                    <b>N5 - Péssima</b>  <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                </div>
                                `
                            }
                            if(_coppm > _arrayIndicesCoppm[4])  {
                                coPpmmText= `
                                <div class="d-flex">                                    
                                    <b>N5 - Péssima</b> <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade pessima" />
                                </div>
                                `
                            }

                            let blocoUmidade = `${parseFloat(_humidity).toFixed(0)}%`;
                            let checkHumi = !isNaN(_humidity) ? blocoUmidade : blocoUmidade = `-`;  

                            blocoTexto = 
                            `
                            <div class="leaflet-bloco d-flex">
                                <div class="leaflet-title">                            
                                    <h2 id="localPopUp">${_pLocal}</h2>
                                    <div class="d-flex">
                                        <div class="d-flex mr-eq">  
                                            <img src="./assets/img/umidade.png" alt="icone de umidade" width="18" /> 
                                            <b class="blue-hum">${checkHumi}</b>
                                        </div>
                                        <div class="d-flex">
                                            <img src="./assets/img/extemp.png" alt="icone de temperatura" width="13" /> 
                                            <b class="orange-temp"> ${parseFloat(_exTmp).toFixed(0)}º </b>
                                        </div>
                                    </div>
                                </div>
                                <div class="leaflet-comb leaflet-title">
                                   <h3>Partículas PM2.5</h3>
                                   <b>${elementName} - ${parseFloat(elementValue).toFixed(2)}m³</b>
                                   ${nValue}
                                </div>
                                <div class="leaflet-comb leaflet-title">
                                    <h3>Ozônio</h3>
                                    <b>O³ - ${parseFloat(_o3ug).toFixed(2)}m³ </b> 
                                    ${o3Text}
                                </div>
                            </div>
                            <div class="leaflet-bloco d-flex">
                                <div class="leaflet-comb leaflet-title">
                                    <h3>Dióxido de nitrogênio</h3>
                                    <b>NO²  - ${parseFloat(_no2ug).toFixed(2)}m³  </b> 
                                    ${no2Text}
                                </div>
                                <div class="leaflet-comb leaflet-title">
                                    <h3>Partículas PM10</h3>
                                    <b>PM¹ - ${parseFloat(_pm10ug).toFixed(2)}m³ </b> 
                                    ${pm10Text}
                                </div>
                                <div class="leaflet-comb leaflet-title">
                                    <h3>Dióxido de carbono</h3>
                                    <b>CO² - ${parseFloat(_coppm).toFixed(2)}m³ </b> 
                                    ${coPpmmText}
                                </div>
                            </div>
                            `;
                        }

                        
                        cheElementsInd(_pm2ug, _arrayIndicesPm2u, 'PM2.5', _pLocal);
                        // cheElementsInd(_coppm, _arrayIndicesCoppm, 'COPPM', _pLocal);
                        // L.circle(arrayLatLong, colorForPm2).addTo(map).bindPopup(blocoTexto).openPopup();
                        markerPoint = L.icon(colorMarkerPm2)
                        L.Marker.prototype.options.icon = markerPoint

                        // L.Icon.Default.imagePath = "https://leafletjs.com/examples/custom-icons/leaf-green.png";
                        // L.Icon.Default.className = "testeClasse";
                        L.marker(arrayLatLong, markerPoint ).addTo(map).bindPopup(blocoTexto).openPopup();
                    }
                }
            }

            getPointsData();
        }catch(e){
            console.log(e)
        }
    }

    fetchApiData()

    // const circleCcd = L.circle([-3.7192225, -38.51417], {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.5,
	// 	radius: 500
	// }).addTo(map);
    // const circleSiquera = L.circle([-3.7899023034813, -38.5868264581879], {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.5,
	// 	radius: 500
	// }).addTo(map);
	// const marker = L.marker([-3.7192225, -38.51417]).addTo(map);
	// const markerPoint = L.marker([-3.7192225, -38.51417]).addTo(map);

    const conversaoParseCol = (elementCol) =>{
        const co2ColSiq = document.querySelectorAll(elementCol);
        let choiceOne;
        if (co2ColSiq){
            for (let i = 0; i < co2ColSiq.length; i++) {
                const element = co2ColSiq[2];
                const convNumber = parseFloat(element.innerHTML);
                const convToFixed = convNumber.toFixed(3);
                return convToFixed;
            }
        }
    };
    const conversaoParseCoNovo = (elementCol) =>{
        const co2ColSiq = document.querySelectorAll(elementCol);
        let choiceOne;
        if (co2ColSiq){
            for (let i = 0; i < co2ColSiq.length; i++) {
                const element = co2ColSiq[2];
                const convNumber = parseFloat(element.innerHTML);
                const convToFixed = convNumber.toFixed(3);
                return convToFixed;
            }
        }
    };

}

export { leaflet };