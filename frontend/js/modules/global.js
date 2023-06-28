function getElement(selector) {
  const element = document.querySelector(selector)
  if (!element) {
    console.error(`O elemento com o seletor '${selector}' não foi encontrado no DOM.`)
  }
  return element
}

export { getElement }
