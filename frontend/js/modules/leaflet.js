/* eslint-disable use-isnan */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const leaflet = () => {
  const mapElement = document.querySelector('#map')
  if (mapElement) {
    const map = L.map('map').setView([-3.71839, -38.54342], 12)
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    let base_url = window.location.origin
    const loadingElement = document.querySelector('#loading');
    const arrayCo2 = [10, 12, 14, 16, 50]
    const arrayO3 = [100, 130, 160, 200, 800]
    const co2description = `O monóxido de carbono é um gás altamente tóxico, 
        com o limite de tolerância de 39 ppm em jornadas de trabalho de até 48 horas/semana, segundo a NR-15.`
    let nText = 'Nível'
    let nValue
    let o3Text
    let no2Text
    let pm10Text
    let coPpmmText
    let colorForPm2
    let colorMarkerPm2
    let blocoTexto
    let markerPoint
    let blocTextGray
    const _radius = 250
    const _fillOpacity = 0.5
    const _arrayIndicesPm2u = [25, 50, 75, 125, 300]
    const _arrayIndicesO3 = [100, 130, 160, 200, 800]
    const _arrayIndicesPm10 = [50, 100, 150, 250, 600]
    const _arrayIndicesCoppm = [10, 12, 14, 16, 50]
    const _arrayIndicesNo2 = [200, 240, 320, 1130, 3750]
    const delay = 36000000

    const fetchApiData = async () => {
      let methodsFetc = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      try {
        let response = await fetch(`${base_url}/api_excel`, methodsFetc)
        if( response.status == 200 ){
          loadingElement.classList.add('toggleDesactive');
        }
        let responseData = await response.json()
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }

        const getPointsData = () => {
          // const timer = (ms) => new Promise((res) => setTimeout(res, ms))
          // async function load() {
          //   // We need to wrap the loop into an async function for this to work
          //   for (let i = 0; i < 4; i++) {
          //     await timer(delay * i) // then the created Promise can be awaited
          //   }
          // }

          //   (let i = 5 - 1; i >= 0; i--)
          for (let i = 0; i < 25; i++) {
            setTimeout(() => {
              for (const key in responseData) {
                if (Object.hasOwnProperty.call(responseData, key)) {
                  // const element = responseData[key].slice().reverse()
                  const element = responseData[key]
                  let lastElement = element[i]
                  console.log(lastElement)
                  let _pLocal = lastElement.Local
                  let _latitude = lastElement.Latitude
                  let _longitude = lastElement.Longitude
                  let arrayLatLong = [lastElement.Latitude, lastElement.Longitude]
                  const _id = lastElement._id
                  const _pm2ug = lastElement.PM2ug
                  const _humidity = lastElement.Humidity
                  const _coppm = lastElement.COppm
                  const _pm10ug = lastElement.PM10ug
                  const _exTmp = lastElement.ExTemp
                  const _no2ug = lastElement.NO2ug
                  const _o3ug = lastElement.O3ug
                  const _hour = lastElement.Hour

                  let blocoUmidade = `${parseFloat(_humidity).toFixed(0)}%`
                  let checkHumi = !isNaN(_humidity) ? blocoUmidade : (blocoUmidade = `-`)

                  const checkO3 = () => {
                    if (_o3ug < _arrayIndicesO3[0]) {
                      o3Text = `
                                              <img src="./assets/img/Boa.png" class="leaflet-nvalue" alt="imagem qualidade boa" />
                                              `
                    }
                    if (_o3ug > _arrayIndicesO3[0] && _o3ug < _arrayIndicesO3[1]) {
                      o3Text = `
                                              <img src="./assets/img/Moderada.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                              `
                    }
                    if (_o3ug > _arrayIndicesO3[1] && _o3ug < _arrayIndicesO3[2]) {
                      o3Text = `
                                              <img src="./assets/img/ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                              `
                    }
                    if (_o3ug > _arrayIndicesO3[2] && _o3ug < _arrayIndicesO3[3]) {
                      o3Text = `
                                              <img src="./assets/img/Muito-ruim.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                              `
                    }
                    if (_o3ug > _arrayIndicesO3[3] && _o3ug < _arrayIndicesO3[4]) {
                      o3Text = `
                                              <img src="./assets/img/pessima.png" class="leaflet-nvalue" alt="imagem qualidade moderada" />
                                              `
                    }
                    if (_o3ug > _arrayIndicesO3[4]) {
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
                                                          class="mr-2" width="22" alt="marker">${_pLocal}<br>
                                                          </h2>
                                                      <div class="d-flex mb-eq">
                                                          <div class="d-flex mr-eq">  
                                                              <img src="./assets/img/extemp.png" alt="icone de temperatura" width="20" /> 
                                                              <strong class="blue-hum"> ${parseFloat(
                                                                _exTmp
                                                              ).toFixed(0)}ºC</strong>
                                                          </div>
                                                          <div class="d-flex">
                                                              <img src="./assets/img/umidade.png" alt="icone de umidade" width="28" /> 
                                                              <strong class="orange-temp">${checkHumi} </strong>
                                                          </div>
                                                      </div>
                                                      <table class="table_leaflet--table table-auto w-100">
                                                          <thead class="text-xl">
                                                              <th>Poluentes</th>
                                                              <th>Valores*</th>
                                                              <th>Medida</th>
                                                              <th>Nível</th>
                                                          </thead> 
                                                          <tbody>                                                          
                                                            <tr style="background: ${
                                                              colorForPm2.fillColor
                                                            }">
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">PM<sub>2.5</sub></h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${parseFloat(
                                                                  _pm2ug
                                                                ).toFixed(2)}</h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${nValue}</h4></td>
                                                            </tr>   
                                                            <tr>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">PM<sub>10</sub></h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${parseFloat(
                                                                  _pm10ug
                                                                ).toFixed(2)}</h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">µg/m³</h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap">${pm10Text}</td>
                                                            </tr>    
                                                            <tr>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">CO</h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${parseFloat(
                                                                  _coppm
                                                                ).toFixed(2)}</h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"> <h4 class="text-xl">ppm</h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap">${coPpmmText}</td>
                                                            </tr>    
                                                            <tr>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">O<sub>3</sub></h4></td>
                                                                <td class="px-2 py-2 whitespace-nowrap"><h4 class="text-xl">${parseFloat(
                                                                  _o3ug
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
                                                      <em class="sofia-font text-xs">/em>
                                                  </div>
                                                  `
                    } else {
                      blocoTexto = `
                                              <div className="d-flex">                            
                                                  <div class="leaflet-title">                            
                                                      <h2 class="d-flex"><img src="https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png" 
                                                      class="mr-2" width="22" alt="marker">${_pLocal}
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
                  L.marker(arrayLatLong, markerPoint).addTo(map).bindPopup(blocoTexto)
                }
              }
            }, delay * i)
          }
        }
        getPointsData()
        //newPoints()
      } catch (e) {
        console.log(e)
      }
    }

    fetchApiData()
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

  document.querySelectorAll('[data-component~="sidebar"]').forEach((button) => {
    button.addEventListener('click', function () {
      toggleActive.forEach((e, i) => {
        e.classList.toggle('hidden')
      })
      toggleDesactive.forEach((e, i) => {
        e.classList.toggle('block')
      })

      logoPoluentes.forEach((e, i) => {
        e.classList.toggle('mb-eq')
      })

      cardsAside.forEach((e, i) => {
        e.classList.toggle('card')
      })

      const elementstarget = document.getElementById(this.dataset.target)
      elementstarget.classList.toggle('active')
    })
  })

  const toggleHidden = (btnToggle, blocktoogle) => {
    if (btnToggle) {
      btnToggle.addEventListener('click', function () {
        blocktoogle.classList.toggle('hidden')
      })
    }
  }

  toggleHidden(btnIconMain, blockLogoMain)
  toggleHidden(btnIconParc, blockLogoParc)
}

export { leaflet }
