/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
import { Chart } from 'chart.js/auto'

const chartAnalytcs = async () => {
  let pathArray = window.location.pathname.split('/')
  let base_url = window.location.origin
  if (pathArray[1] == 'analise-data') {

    const select = document.getElementById('form-selectPlace')
    const elementformPm2 = document.getElementById('formPm2Geral')
    const elementDiaria = document.getElementById('formDiaria')
    const elementMensal = document.getElementById('formMensal')
    const elementDiariaPm10 = document.getElementById('formDiariaPm10')
    const elementMensalPm10 = document.getElementById('formMensalPm10')
    // elementDiaria.style.display = 'none'
    // elementMensal.style.display = 'none'
    // elementDiariaPm10.style.display = 'none'
    // elementMensalPm10.style.display = 'none'

    const ctx = document.getElementById('myChart')
    const ctxGpt = document.getElementById('meuGrafico')
    const ctxArea = document.getElementById('myAreaChart')
    const pieChart = document.querySelector('#pieChart')
    const formSelector = document.querySelector('#form-selectPlace')
    const loadingElement = document.querySelector('#loading');

    const _arrayIndicesPm2u = [25, 50, 75, 125, 300]
    const _arrayIndicesPm10 = [50, 100, 150, 250, 600]

    let colorGreen = 'rgba(82, 174, 50, 1.0)'
    let borderGreen = 'rgba(82, 174, 50, 1.0)'

    let colorYellow = 'rgba(224, 206, 0, 1.0)'
    let borderYellow = 'rgba(224, 206, 0, 1.0)'

    let colorOrange = 'rgba(239, 125, 0, 1.0)'
    let borderOrange = 'rgba(239, 125, 0, 1.0)'

    let colorRed = 'rgba(213, 18, 36, 1.0)'
    let borderRed = 'rgba(213, 18, 36, 1.0)'

    let colorPurple = 'rgba(104, 55, 147, 1.0)'
    let borderPurple = 'rgba(104, 55, 147, 1.0)'

    const arrayBgColors = []
    const arrayBorderColors = []
    const arrayLastLabels = []
    const arrayLastPm2 = []
    const arrayOptionMonitores = []
    const arrayHours = []
    const arrayResponseData = {}
    const arrayValuesSelect = []
    const arrayHourPlace = []
    const arrayPm2Daily =[]

    let methodsFetc = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      let response = await fetch(`${base_url}/api_excel`, methodsFetc)
      console.log(response.status)
      if(response.status == 200 ){
        loadingElement.classList.add('toggleDesactive');
      }
      let responseData = await response.json()
      Object.entries(responseData).forEach(([key, value]) => {
        arrayResponseData[key] = value;
      });
      for (const key in responseData) {
        arrayValuesSelect.push(...[key])
        const dataObjects = responseData[key].slice().reverse()
        if (dataObjects.length > 0) {
          const lastItemArray = dataObjects[dataObjects.length - 1]
          arrayLastLabels.push(...[lastItemArray.Local])
          arrayLastPm2.push(...[lastItemArray.PM2ug])
        }
      }
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
    } catch (e) {
      console.log(e)
    }

    if (arrayLastLabels.length > 0) {
      for (let i = 0; i < arrayLastLabels.length; i++) {
        const element = arrayLastLabels[i]
        arrayOptionMonitores.push(...[element])
      }
      let todosOsLugares = `Todos os monitores`
      let selectTodosMon = `todosOsMon`
      arrayOptionMonitores.unshift(todosOsLugares)
      arrayValuesSelect.unshift(selectTodosMon)
      for (let i = 0; i < arrayOptionMonitores.length; i++) {
        const option = document.createElement('option')
        option.value = arrayValuesSelect[i]
        option.textContent = arrayOptionMonitores[i]
        formSelector.appendChild(option)
      }
    }

    const dados = {
      labels: arrayLastLabels,
      data: arrayLastPm2,
    }

    const dadosOrdenados = dados.labels.map((label, index) => ({
      label: label,
      data: dados.data[index],
    }))
    dadosOrdenados.sort((a, b) => a.data - b.data)
    const labelsOrdenados = dadosOrdenados.map((item) => item.label)
    const dataOrdenados = dadosOrdenados.map((item) => {

      if (item.data > 1 && item.data < _arrayIndicesPm2u[0]) {
        arrayBgColors.push(...[colorGreen])
        arrayBorderColors.push(...[borderGreen])
      }
      if (item.data > _arrayIndicesPm2u[0] && item.data < _arrayIndicesPm2u[1]) {
        arrayBgColors.push(...[colorYellow])
        arrayBorderColors.push(...[borderYellow])
      }
      if (item.data > _arrayIndicesPm2u[1] && item.data < _arrayIndicesPm2u[2]) {
        arrayBgColors.push(...[colorOrange])
        arrayBorderColors.push(...[borderOrange])
      }
      if (item.data > _arrayIndicesPm2u[2] && item.data < _arrayIndicesPm2u[3]) {
        arrayBgColors.push(...[colorRed])
        arrayBorderColors.push(...[borderRed])
      }
      if (item.data > _arrayIndicesPm2u[3] && item.data < _arrayIndicesPm2u[4]) {
        arrayBgColors.push(...[colorPurple])
        arrayBorderColors.push(...[borderPurple])
      }
      return item.data
    })

    const dadosFinalBar = {
      labels: labelsOrdenados,
      datasets: [
        {
          label: false,
          data: dataOrdenados,
          backgroundColor: arrayBgColors,
          borderColor: arrayBorderColors,
          borderWidth: 2,
        },
      ],
    }

    const opcoes = {
      responsive: true,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 300,
        },
      },
    }

    function checkRadios() {
      const radios = document.getElementsByName('radioPeriodicoPol')

      for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', function () {
          console.log('teste', radios[i].value)
          if (radios[i].value == 'mensal') {
            elementDiaria.style.display = 'none'
            elementMensal.style.display = 'block'
            elementformPm2.style.display = 'none'
          } else {
            elementDiaria.style.display = 'block'
            elementMensal.style.display = 'none'
            elementformPm2.style.display = 'none'
          }
        })
      }
    }

    select.addEventListener('change', function () {
      const selectedValue = select.value;
      if(arrayResponseData){
        for (const key in arrayResponseData) {
          if (Object.hasOwnProperty.call(arrayResponseData, key)) {
            const elementData = arrayResponseData[key]
            if(selectedValue === key ){
              console.log("são iguais")
              console.log(elementData)
              arrayHourPlace.splice(0, arrayHourPlace.length);
              arrayPm2Daily.splice(0, arrayPm2Daily.length);
              for (let i = 0; i < elementData.length; i++) {
                const testElem = elementData[i];
                let numberHour = `${testElem.Hour}`
                let numberPm2 =  `${testElem.PM2ug}`
                arrayHourPlace.push(...[numberHour])
                arrayPm2Daily.push(...[numberPm2])
              }
              console.log(arrayHourPlace)
              console.log(arrayPm2Daily)              

              let chartDinamyc = new Chart(ctxArea, {
                type: 'bar',
                data: {
                  labels: arrayHourPlace,
                  datasets: [
                    {
                      label: 'Média pm2.5', // Rótulo do gráfico
                      data: arrayPm2Daily, // Dados para o gráfico
                      backgroundColor: 'rgba(50, 20, 192, 0.2)', // Cor de preenchimento da área
                      borderColor: 'rgba(50, 20, 192, 1)', // Cor da borda
                      borderWidth: 1, // Largura da borda
                    },
                  ],
                },
                options: {
                  indexAxis: 'y', // Define o eixo vertical como o eixo do índice (vertical)
                  scales: {
                    y: {
                      beginAtZero: true // Começa o eixo vertical no valor zero
                    }
                  }
                }
              })

              chartDinamyc.destroy();

              chartDinamyc = new Chart(ctxArea, {
                type: 'bar',
                data: {
                  labels: arrayHourPlace,
                  datasets: [
                    {
                      label: 'Média pm2.5', // Rótulo do gráfico
                      data: arrayPm2Daily, // Dados para o gráfico
                      backgroundColor: 'rgba(50, 20, 192, 0.2)', // Cor de preenchimento da área
                      borderColor: 'rgba(50, 20, 192, 1)', // Cor da borda
                      borderWidth: 1, // Largura da borda
                    },
                  ],
                },
                options: {
                  indexAxis: 'y', // Define o eixo vertical como o eixo do índice (vertical)
                  scales: {
                    y: {
                      beginAtZero: true // Começa o eixo vertical no valor zero
                    }
                  }
                }
              })

            }else{
              // elementDiaria.style.display = 'none'
              // elementMensal.style.display = 'none'
              // elementformPm2.style.display = 'block'
            }
          }
        }
      }
      
    })

    if (ctx) {
      const ctxFinal = ctx.getContext('2d')
      new Chart(ctxFinal, {
        type: 'bar',
        data: dadosFinalBar,
        options: opcoes,
      })
    }



    checkRadios()

  }
}

export { chartAnalytcs }
