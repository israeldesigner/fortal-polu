import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocFromCache,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// configuração firebase
const email = 'israeldesigner@icloud.com'
const password = '6klzKIaA*hfKTa31'
const firebaseConfig = {
  apiKey: 'AIzaSyAl3Z8cGE62ZNFc__yLCktbvqyhXTVsGi8',
  authDomain: 'moqatrama-prod.firebaseapp.com',
  projectId: 'moqatrama-prod',
  storageBucket: 'moqatrama-prod.appspot.com',
  messagingSenderId: 1058408189763,
  appId: '1:1058408189763:web:fdac184953248dde9d69f6',
  measurementId: 'G-CWNNPY01JF',
}
// const firebaseConfig = {
//   apiKey: "AIzaSyAtn_0eGG5dRv1UMX_T4AsoCGR92EwpB94",
//   authDomain: "moqatrama-stg.firebaseapp.com",
//   projectId: "moqatrama-stg",
//   storageBucket: "moqatrama-stg.appspot.com",
//   messagingSenderId: "293229535405",
//   appId: "1:293229535405:web:2617f6a807e76f60de2624",
// };

const leaflet = () => {
  const mapElement = document.querySelector('#map')
  if (mapElement) {
    //init map
    const map = L.map('map').setView([-3.71839, -38.54342], 12)
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    console.log('testando outro ponto')

    const markWithOutPoint = {
      iconUrl: './assets/img/Semponto.png',
      iconRetinaUrl: './assets/img/Semponto.png',
      iconSize: [40, 40],
    }

    const insertBlockText = (local) => {
      let blockTexto = `
      <div className="d-flex">                            
          <div class="leaflet-title">                            
              <h2 class="d-flex text-lowercase"><img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" 
              class="mr-2" width="22" alt="marker"> ${local}
              </h2>
              <p>
                  Monitor a ser instalado
              </p>
          </div>
      </div>
      `
      return blockTexto
    }

    let markerPointNot = L.icon(markWithOutPoint)
    L.Marker.prototype.options.icon = markerPointNot
    L.marker([-3.82838, -38.55674])
      .addTo(map)
      .bindPopup(insertBlockText('SCSP - Av C X Av L - PREFEITO JOSÉ WALTER'))
    L.marker([-3.71834, -38.46562])
      .addTo(map)
      .bindPopup(insertBlockText('SME - GODOFREDO DE CASTRO FILHO 2'))
    L.marker([-3.81627, -38.53165])
      .addTo(map)
      .bindPopup(insertBlockText('SEGER - AV PRES JUSCELINO KUBITSCHEK X AV DOS PAROARAS'))
    L.marker([-3.78753, -38.54793])
      .addTo(map)
      .bindPopup(insertBlockText('AMC - AV. EXPEDICIONÁRIOS X AV. DEDÉ BRASIL'))
    L.marker([-3.78151, -38.50257]).addTo(map).bindPopup(insertBlockText('ARENINHA LAGOA DA ZEZA'))
    L.marker([-3.82953, -38.46658]).addTo(map).bindPopup(insertBlockText('SME - ISABEL FERREIRA'))
    L.marker([-3.83172, -38.49403])
      .addTo(map)
      .bindPopup(insertBlockText('AMC - RUA PADRE PEDRO DE ALENCAR X RUA TEN. JURANDIR DE ALENCA'))
    L.marker([-3.83412, -38.56899])
      .addTo(map)
      .bindPopup(insertBlockText('SME - EMTI LEONEL DE MOURA BRIZOLA'))
    L.marker([-3.7518, -38.52577])
      .addTo(map)
      .bindPopup(insertBlockText('PRAÇA NOSSA SENHORA DE FÁTIMA'))
    L.marker([-3.73339, -38.49693]).addTo(map).bindPopup(insertBlockText('PRAÇA PORTUGAL'))
    L.marker([-3.73158, -38.5449])
      .addTo(map)
      .bindPopup(insertBlockText('SEGER - AV BEZERRA DE MENEZES X AV JOSE JATAHY'))
    L.marker([-3.86736, -38.49394])
      .addTo(map)
      .bindPopup(insertBlockText('SME - GUIOMAR DA SILVA ALMEIDA'))
    L.marker([-3.84632, -38.52293])
      .addTo(map)
      .bindPopup(insertBlockText('SME - CÉSAR CALS DE OLIVEIRA NETO'))
    L.marker([-3.76848, -38.5516])
      .addTo(map)
      .bindPopup(insertBlockText('SCSP - RUA ANTONIO FIUZA X RUA BARÃO DE SOBRAL'))
    L.marker([-3.7238, -38.47711])
      .addTo(map)
      .bindPopup(insertBlockText('SME - EM PROFESSORA CONSUELO AMORA'))
    L.marker([-3.71196, -38.55544])
      .addTo(map)
      .bindPopup(insertBlockText('SME - [ESCOLA MUNICIPAL / HILBERTO SILVA]'))
    L.marker([-3.75852, -38.58386])
      .addTo(map)
      .bindPopup(insertBlockText('PRAÇA DOM LUSTOSA (Henrique Jorge)'))
    L.marker([-3.72403, -38.5834])
      .addTo(map)
      .bindPopup(insertBlockText('AV MAJOR ASSIS X RUA ALBERTO FERREIRA'))
    L.marker([-3.82881, -38.52133])
      .addTo(map)
      .bindPopup(insertBlockText('SCSP - AV JOR THOMAZ COELHO / AV PRS COSTA E SILVA'))

    const colorBoaStatic = {
      iconUrl: './assets/img/Boa.png',
      iconRetinaUrl: './assets/img/Boa.png',
      className: 'leaflet-boa',
      iconSize: [40, 40],
    }

    const insertGreenText = (local) => {
      let blocoTexto = `
      <div classname="d-flex table__leaflet">                            
                                        <div class="leaflet-title">                            
                                            <h2 class="d-flex text-lowercase">
                                                <img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" 
                                                class="mr-2" width="22" height="auto" alt="marker">${local}</h2>
                                            <table class="table_leaflet--table  w-100">
                                                <thead class="text-xl">
                                                    <tr><th>Poluentes</th>
                                                    <th>Valores*</th>
                                                    <th>Medida</th>
                                                    <th>Nível</th>
                                                </tr></thead> 
                                                <tbody>                                                          
                                                  <tr style="background: #8ae271">
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">PM<sub>2.5</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">13</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa"></h4></td>
                                                  </tr>   
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">PM<sub>10</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">15</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa">
                                    </td>
                                                  </tr>    
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">CO</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">13</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"> <h4 class="text-xl">ppm</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">
                                    <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade pessima">
                                    </td>
                                                  </tr>    
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">O<sub>3</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">119,11</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">
                                    <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada">
                                    </td>
                                                  </tr>    
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">NO<sub>2</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">129,37</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade moderada">
                                    </td>
                                                  </tr>    
                                                </tbody>
                                            </table>
                                            </div>
                                            <em class="sofia-font text-xs">
                                              *No momento os dados foram coletados às. 4:40:39</em>
                                        </div>
      
      `
      return blocoTexto
    }

    let markerPointgreen = L.icon(colorBoaStatic)
    L.Marker.prototype.options.icon = markerPointgreen

    L.marker([-3.72612, -38.4951]).addTo(map).bindPopup(insertGreenText('PROJ. WIFOR BM'))
    L.marker([-3.72546, -38.53269])
      .addTo(map)
      .bindPopup(
        insertGreenText('SESEC - R. GUILHERME ROCHA X AV. TRISTÃO GONÇALVES (Pç da lagoinha)')
      )
    L.marker([-3.72183, -38.47893])
      .addTo(map)
      .bindPopup(insertGreenText('AMC - AV. BEIRA MAR X AV. ABOLIÇÃO'))

    //init firebase
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const dataReal = collection(db, 'system-1')
    const tiqam392 = query(dataReal, orderBy('data'), limit(86))

    const objects392 = []
    let latitude_ = ''
    let longitude_ = ''
    let local = ''
    let nValue
    let o3Text
    let no2Text
    let pm10Text
    let coPpmmText
    let colorForPm2
    let colorMarkerPm2
    let blocoTexto
    let markerPoint
    const _radius = 250
    const _fillOpacity = 0.5
    const _arrayIndicesPm2u = [25, 50, 75, 125, 300]
    const _arrayIndicesO3 = [100, 130, 160, 200, 800]
    const _arrayIndicesPm10 = [50, 100, 150, 250, 600]
    const _arrayIndicesCoppm = [10, 12, 14, 16, 50]
    const _arrayIndicesNo2 = [200, 240, 320, 1130, 3750]

    const getMoq392 = onSnapshot(tiqam392, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        objects392.push(doc.data())
      })
      let lastElement = objects392[objects392.length - 1]

      for (let i = 0; i < objects392.length; i++) {
        const element = objects392[i]
        const localMoqaID = element.moqaID
        console.log(element)

        if (localMoqaID == 'tiqam392') {
          latitude_ = -3.7899023034813
          longitude_ = -38.5868264581879
          local = 'Siqueira '
        }
        if (localMoqaID == 'tiqam392nova') {
          latitude_ = -3.7192162962032
          longitude_ = -38.514145586396
          local = 'Fundação de Ciência, Tecnologia e Inovação de Fortaleza – Citinova'
        }
        const _pm2ug = element.pm25
        const _humidity = element.hum
        const _coppm = element.adc2
        const _pm10ug = element.pm10
        const _exTmp = element.extTemp
        const _intTmp = element.intTemp
        const _no2ppm = element.adc1
        const _o3ug = element.adc0
        const _hour = element.hora
        const _data = element.data
        const _timestapm = element.myTimestamp.seconds

        //formulas
        const no2Const = 46.01
        const o3const = 48
        const formCalc = 0.082
        const formCalcDiv = 273.15
        const _no2ug = (no2Const * (_no2ppm * 1000)) / (formCalc * (_exTmp + formCalcDiv)) / 100000
        console.log(_no2ug)
        const o3ug = (o3const * (_o3ug * 1000)) / (formCalc * (_exTmp + formCalcDiv)) / 10000
        console.log(o3ug)
        const coFinal = _coppm / 10000
        console.log(coFinal)

        let blocoUmidade = `${parseFloat(_humidity).toFixed(0)}%`
        let checkHumi = !isNaN(_humidity) ? blocoUmidade : (blocoUmidade = `-`)

        const checkO3 = () => {
          if (o3ug < _arrayIndicesO3[0]) {
            o3Text = `
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                    `
          }
          if (o3ug > _arrayIndicesO3[0] && o3ug < _arrayIndicesO3[1]) {
            o3Text = `
                                    <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (o3ug > _arrayIndicesO3[1] && o3ug < _arrayIndicesO3[2]) {
            o3Text = `
                                    <img src="./assets/img/ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (o3ug > _arrayIndicesO3[2] && o3ug < _arrayIndicesO3[3]) {
            o3Text = `
                                    <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (o3ug > _arrayIndicesO3[3] && o3ug < _arrayIndicesO3[4]) {
            o3Text = `
                                    <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (o3ug > _arrayIndicesO3[4]) {
            o3Text = `
                                    <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
        }

        const checkNo2 = () => {
          if (_no2ug < _arrayIndicesNo2[0]) {
            no2Text = `
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                    `
          }
          if (_no2ug > _arrayIndicesNo2[0] && _no2ug < _arrayIndicesNo2[1]) {
            no2Text = `
                                    <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_no2ug > _arrayIndicesNo2[1] && _no2ug < _arrayIndicesNo2[2]) {
            no2Text = `
                                    <img src="./assets/img/ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_no2ug > _arrayIndicesNo2[2] && _no2ug < _arrayIndicesNo2[3]) {
            no2Text = `
                                    <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_no2ug > _arrayIndicesNo2[3] && _no2ug < _arrayIndicesNo2[4]) {
            no2Text = `
                                     <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_no2ug > _arrayIndicesNo2[4]) {
            no2Text = `
                                    <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
        }

        const checkPm10Ug = () => {
          if (_pm10ug < _arrayIndicesPm10[0]) {
            pm10Text = `
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                    `
          }
          if (_pm10ug > _arrayIndicesPm10[0] && _pm10ug < _arrayIndicesPm10[1]) {
            pm10Text = `
                                    <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_pm10ug > _arrayIndicesPm10[1] && _pm10ug < _arrayIndicesPm10[2]) {
            pm10Text = `
                                    <img src="./assets/img/ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_pm10ug > _arrayIndicesPm10[2] && _pm10ug < _arrayIndicesPm10[3]) {
            pm10Text = `
                                    <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_pm10ug > _arrayIndicesPm10[3] && _pm10ug < _arrayIndicesPm10[4]) {
            pm10Text = `               
                                        <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_pm10ug > _arrayIndicesPm10[4]) {
            pm10Text = `   
                                        <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade pessima" />
                                    `
          }
        }

        const checkCOppm = () => {
          if (_coppm < _arrayIndicesCoppm[0]) {
            coPpmmText = `
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                    `
          }
          if (_coppm > _arrayIndicesCoppm[0] && _coppm < _arrayIndicesCoppm[1]) {
            coPpmmText = `
                                    <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                    `
          }
          if (_coppm > _arrayIndicesCoppm[1] && _coppm < _arrayIndicesCoppm[2]) {
            coPpmmText = `
                                    <img src="./assets/img/ruim.png" class="leaflet-nvalue" alt="imagem qualidade ruim" />
                                    `
          }
          if (_coppm > _arrayIndicesCoppm[2] && _coppm < _arrayIndicesCoppm[3]) {
            coPpmmText = `
                                    <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade muito ruim" />
                                    `
          }
          if (_coppm > _arrayIndicesCoppm[3] && _coppm < _arrayIndicesCoppm[4]) {
            coPpmmText = `
                                        <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade pessima" />
                                    `
          }
          if (_coppm > _arrayIndicesCoppm[4]) {
            coPpmmText = `
                                    <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade pessima" />
                                    `
          }
        }

        const cheElementsInd = () => {
          if (_pm2ug < 1) {
            nValue = `
                                    <img src="./assets/img/Semponto.png" class="leaflet-nvalue" alt="sem ponto" />`
            colorForPm2 = {
              color: 'Gray',
              fillColor: '#e4e4e4',
              fillOpacity: _fillOpacity,
              radius: _radius,
            }
            colorMarkerPm2 = {
              iconUrl: './assets/img/Semponto.png',
              iconRetinaUrl: './assets/img/Semponto.png',
              iconSize: [40, 40],
            }
          }
          if (_pm2ug > 1 && _pm2ug < _arrayIndicesPm2u[0]) {
            nValue = `
                                    <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />`
            colorForPm2 = {
              color: 'Green',
              fillColor: '#8ae271',
              fillOpacity: _fillOpacity,
              radius: _radius,
            }
            colorMarkerPm2 = {
              iconUrl: './assets/img/Boa.png',
              iconRetinaUrl: './assets/img/Boa.png',
              className: 'leaflet-boa',
              iconSize: [40, 40],
            }
          }
          if (_pm2ug > _arrayIndicesPm2u[0] && _pm2ug < _arrayIndicesPm2u[1]) {
            nValue = `
                                    <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" /> `
            colorForPm2 = {
              color: 'yellow',
              fillColor: '#ffff63',
              fillOpacity: _fillOpacity,
              radius: _radius,
            }
            colorMarkerPm2 = {
              iconUrl: './assets/img/Moderada.png',
              iconRetinaUrl: './assets/img/Moderada.png',
              className: 'leaflet-moderada',
              iconSize: [40, 40],
            }
          }
          if (_pm2ug > _arrayIndicesPm2u[1] && _pm2ug < _arrayIndicesPm2u[2]) {
            nValue = `
                                    <img src="./assets/img/ruim.png" class="leaflet-nvalue" alt="imagem qualidade ruim" />`
            colorForPm2 = {
              color: 'orange',
              fillColor: '#ee9f00',
              fillOpacity: _fillOpacity,
              radius: _radius,
            }
            colorMarkerPm2 = {
              iconUrl: './assets/img/ruim.png',
              iconRetinaUrl: './assets/img/ruim.png',
              className: 'leaflet-ruim',
              iconSize: [40, 40],
            }
          }
          if (_pm2ug > _arrayIndicesPm2u[2] && _pm2ug < _arrayIndicesPm2u[3]) {
            nValue = `
                                    <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade Muito ruim" />`
            colorForPm2 = {
              color: 'red',
              fillColor: '#ff5959',
              fillOpacity: _fillOpacity,
              radius: _radius,
            }
            colorMarkerPm2 = {
              iconUrl: './assets/img/Muito-ruim.png',
              iconRetinaUrl: './assets/img/Muito-ruim.png',
              className: 'leaflet-mruim',
              iconSize: [40, 40],
            }
          }
          if (_pm2ug > _arrayIndicesPm2u[3] && _pm2ug < _arrayIndicesPm2u[4]) {
            nValue = `
                                    <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />`
            colorForPm2 = {
              color: 'purple',
              fillColor: '#ff64ff',
              fillOpacity: _fillOpacity,
              radius: _radius,
            }
            colorMarkerPm2 = {
              iconUrl: './assets/img/pessima.png',
              iconRetinaUrl: './assets/img/pessima.png',
              className: 'leaflet-pessima',
              iconSize: [40, 40],
            }
          }
          if (_pm2ug > _arrayIndicesPm2u[4]) {
            nValue = `
                                    <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />`
            colorForPm2 = {
              color: 'purple',
              fillColor: '#ff64ff',
              fillOpacity: _fillOpacity,
              radius: _radius,
            }
            colorMarkerPm2 = {
              iconUrl: './assets/img/pessima.png',
              iconRetinaUrl: './assets/img/pessima.png',
              className: 'leaflet-pessima',
              iconSize: [40, 40],
            }
          }
        }

        const createBlockText = () => {
          if (_pm2ug > 1) {
            blocoTexto = `
                                    <div className="d-flex table__leaflet">                            
                                        <div class="leaflet-title">                            
                                            <h2 class="d-flex">
                                                <img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" 
                                                class="mr-2" width="22" height="auto" alt="marker">${local}</h2>
                                            <table class="table_leaflet--table  w-100">
                                                <thead class="text-xl">
                                                    <th>Poluentes</th>
                                                    <th>Valores*</th>
                                                    <th>Medida</th>
                                                    <th>Nível</th>
                                                </thead> 
                                                <tbody>                                                          
                                                  <tr style="background: ${colorForPm2.fillColor}">
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">PM<sub>2.5</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${_pm2ug}</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${nValue}</h4></td>
                                                  </tr>   
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">PM<sub>10</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${_pm10ug}</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">${pm10Text}</td>
                                                  </tr>    
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">CO</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${parseFloat(
                                                        coFinal
                                                      ).toFixed(2)}</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"> <h4 class="text-xl">ppm</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">${coPpmmText}</td>
                                                  </tr>    
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">O<sub>3</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${parseFloat(
                                                        o3ug
                                                      ).toFixed(2)}</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">${o3Text}</td>
                                                  </tr>    
                                                  <tr>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">NO<sub>2</sub></h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${parseFloat(
                                                        _no2ug
                                                      ).toFixed(2)}</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                      <td class="px-2 py-2 whitespace-nowrap">${no2Text}</td>
                                                  </tr>    
                                                </tbody>
                                            </table>
                                            </div>
                                            <em class="sofia-font text-xs">
                                              *No momento os dados foram coletados às ${_hour}.</em>
                                        </div>
                                        `
          } else {
            blocoTexto = `
                                    <div className="d-flex">                            
                                        <div class="leaflet-title">                            
                                            <h2 class="d-flex"><img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" 
                                            class="mr-2" width="22" alt="marker">
                                            </h2>
                                            <p>
                                                Monitor a ser instalado
                                            </p>
                                        </div>
                                    </div>
                                    `
          }
        }

        checkO3()
        checkNo2()
        checkPm10Ug()
        checkCOppm()
        cheElementsInd()
        createBlockText()
        markerPoint = L.icon(colorMarkerPm2)
        L.Marker.prototype.options.icon = markerPoint
        L.marker([latitude_, longitude_], markerPoint).addTo(map).bindPopup(blocoTexto)
      }
    })

    const auth = getAuth(app)
    const checkAut = async () => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          getMoq392
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
    }

    checkAut()

    // L.marker([3.82838, -38.55674], {
    //   color: 'Gray',
    //   fillColor: '#e4e4e4',
    //   fillOpacity: '#f2f2f2',
    //   radius: _radius,
    // })
    //   .addTo(map)
    //   .bindPopup('não tem dado')
  }
  const toggleActive = document.querySelectorAll('.toggleActive')
  const toggleDesactive = document.querySelectorAll('.toggleDesactive')
  const logoPoluentes = document.querySelectorAll('.logos-poluentes')
  const btnActiveShow = document.querySelector('.btnShow')
  const cardsAside = document.querySelectorAll('.aside__card')
  const btnIconMain = document.querySelector('.icon-main')
  const btnIconParc = document.querySelector('.icon-parc')
  const blockLogoMain = document.querySelector('.left-side__top')
  const blockLogoParc = document.querySelector('.left-side__bottom')

  // document.querySelectorAll('[data-component~="sidebar"]').forEach((button) => {
  //   button.addEventListener('click', function () {
  //     toggleActive.forEach((e, i) => {
  //       e.classList.toggle('hidden')
  //     })
  //     toggleDesactive.forEach((e, i) => {
  //       e.classList.toggle('block')
  //     })

  //     logoPoluentes.forEach((e, i) => {
  //       e.classList.toggle('mb-eq')
  //     })

  //     cardsAside.forEach((e, i) => {
  //       e.classList.toggle('card')
  //     })

  //     const elementstarget = document.getElementById(this.dataset.target)
  //     elementstarget.classList.toggle('active')
  //   })
  // })

  // const toggleHidden = (btnToggle, blocktoogle) => {
  //   if(btnToggle){
  //     btnToggle.addEventListener('click', function(){
  //       blocktoogle.classList.toggle('hidden')
  //     })
  //   }
  // }

  // toggleHidden(btnIconMain, blockLogoMain);
  // toggleHidden(btnIconParc, blockLogoParc);
}

export { leaflet }
