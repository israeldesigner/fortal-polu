/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
import { Chart } from 'chart.js/auto'

const chartAnalytcs = async () => {
  let pathArray = window.location.pathname.split('/')
  let base_url = window.location.origin
  if (pathArray[1] == 'analise-data') {

    const ctx = document.getElementById('myChart')
    const ctxGpt = document.getElementById('meuGrafico')
    const ctxArea = document.getElementById('myAreaChart')
    const pieChart = document.querySelector('#pieChart')
    const formSelector = document.querySelector('#form-selectPlace')

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

    let methodsFetc = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      let response = await fetch(`${base_url}/api_excel`, methodsFetc)
      let responseData = await response.json()
      for (const key in responseData) {
        const dataObjects = responseData[key].slice().reverse()
        if(dataObjects.length > 0 ){
          const lastItemArray = dataObjects[dataObjects.length -1]
          arrayLastLabels.push(...[lastItemArray.Local])
          arrayLastPm2.push(...[lastItemArray.PM2ug])
        }
      }
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
    }catch (e) {
      console.log(e)
    }


    if(arrayLastLabels.length > 0) {
      for (let i = 0; i < arrayLastLabels.length; i++) {
        const element = arrayLastLabels[i];        
        arrayOptionMonitores.push(...[element])
      }
      let todosOsLugares = `Todos os monitores`
      arrayOptionMonitores.unshift(todosOsLugares)
      console.log(arrayOptionMonitores)
      for (let i = 0; i < arrayOptionMonitores.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = arrayOptionMonitores[i];
        formSelector.appendChild(option);
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
      console.log(item)
      console.log(item.data)

      if (item.data > 1 && item.data < _arrayIndicesPm2u[0]) {
        console.log('Nível bom')
        arrayBgColors.push(...[colorGreen])
        arrayBorderColors.push(...[borderGreen])
      }
      if (item.data > _arrayIndicesPm2u[0] && item.data < _arrayIndicesPm2u[1]) {
        console.log('Nível moderado')
        arrayBgColors.push(...[colorYellow])
        arrayBorderColors.push(...[borderYellow])
      }
      if (item.data > _arrayIndicesPm2u[1] && item.data < _arrayIndicesPm2u[2]) {
        console.log('Nível ruim')
        arrayBgColors.push(...[colorOrange])
        arrayBorderColors.push(...[borderOrange])
      }
      if (item.data > _arrayIndicesPm2u[2] && item.data < _arrayIndicesPm2u[3]) {
        console.log('Nível muito ruim')
        arrayBgColors.push(...[colorRed])
        arrayBorderColors.push(...[borderRed])
      }
      if (item.data > _arrayIndicesPm2u[3] && item.data < _arrayIndicesPm2u[4]) {
        arrayBgColors.push(...[colorPurple])
        arrayBorderColors.push(...[borderPurple])
        console.log('Nível péssima')
      }
      return item.data
    })

    // console.log(arrayBgColors)
    // console.log(arrayBgColors.length)
    // console.log(labelsOrdenados.length)
    // console.log(dataOrdenados.lenghts)

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

    if (ctx) {
      const ctxFinal = ctx.getContext('2d')
      new Chart(ctxFinal, {
        type: 'bar',
        data: dadosFinalBar,
        options: opcoes,
      })
    }

    const arrayRandomData = []

    for (let i = 0; i < 28; i++) {
      const randomNumber = Math.floor(Math.random() * (255 - 7 + 1)) + 7
      arrayRandomData.push(randomNumber)
    }

    if (ctxGpt) {
      new Chart(ctxGpt, {
        type: 'line', // Defina o tipo como 'line' para um gráfico de área
        data: {
          labels: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
          ], // Rótulos dos dados no eixo X
          datasets: [
            {
              label: 'Meu Gráfico de Área', // Rótulo do gráfico
              data: arrayRandomData, // Dados para o gráfico
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de preenchimento da área
              borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda
              borderWidth: 1, // Largura da borda
              cubicInterpolationMode: 'monotone',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true, // Torna o gráfico responsivo ao redimensionar a janela
        },
      })
    }

    const arrayRandomDataHour = []

    for (let i = 0; i < 28; i++) {
      const randomNumber = Math.floor(Math.random() * (255 - 7 + 1)) + 7
      arrayRandomDataHour.push(randomNumber)
    }

    if (ctxArea) {
      new Chart(ctxArea, {
        type: 'bar',
        data: {
          labels: [
            '00h',
            '1h',
            '2h',
            '3h',
            '4h',
            '5h',
            '6h',
            '7h',
            '8h',
            '9h',
            '10h',
            '11h',
            '12h',
            '13h',
            '14h',
            '15h',
            '16h',
            '17h',
            '18h',
            '19h',
            '20h',
            '21h',
            '22h',
            '23h',
          ], // Rótulos dos dados no eixo X
          datasets: [
            {
              label: 'Média pm10', // Rótulo do gráfico
              data: arrayRandomDataHour, // Dados para o gráfico
              backgroundColor: 'rgba(50, 20, 192, 0.2)', // Cor de preenchimento da área
              borderColor: 'rgba(50, 20, 192, 1)', // Cor da borda
              borderWidth: 1, // Largura da borda
              cubicInterpolationMode: 'monotone',
              fill: true,
            },
          ],
        },
        options: opcoes,
      })
    }

    const select = document.getElementById('form-selectPlace')

    const elementformPm2 = document.getElementById('formPm2Geral')
    const elementDiaria = document.getElementById('formDiaria')
    const elementMensal = document.getElementById('formMensal')
    const elementDiariaPm10 = document.getElementById('formDiariaPm10')
    const elementMensalPm10 = document.getElementById('formMensalPm10')
    elementDiaria.style.display = 'none'
    elementMensal.style.display = 'none'
    elementDiariaPm10.style.display = 'none'
    elementMensalPm10.style.display = 'none'

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
      if (select.value === '1') {
        elementDiaria.style.display = 'block'
        elementMensal.style.display = 'none'
        elementformPm2.style.display = 'none'
      }
      if (select.value === '0') {
        elementDiaria.style.display = 'none'
        elementMensal.style.display = 'none'
        elementformPm2.style.display = 'block'
      }
    })

    checkRadios()
  }
}

export { chartAnalytcs }
