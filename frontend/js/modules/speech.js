const speech = () => {
  window.onload = function () {
    let tempBtn = document.querySelector('#soundTemp')
    let tempText = document.querySelector('.textTemp').textContent

    // if (tempBtn) {
    //   tempBtn.addEventListener('click', function () {
    //     let msgSpeech = new SpeechSynthesisUtterance()
    //     msgSpeech.text = tempText
    //     speechSynthesis.speak(tempText)
    //   })
    // }
  }
}

export { speech }
