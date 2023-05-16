const menu = () => {
  let pathArray = window.location.pathname.split('/')
  let navContact = document.querySelector('.nav-contact')
  let navAnalytic = document.querySelector('.nav-analytic')
  let navPolicy = document.querySelector('.nav-policy')
  let navAbout = document.querySelector('.nav-about')
  let navHome = document.querySelector('.nav-home')

  if (pathArray[1] == '') navHome.classList.add('text-success')
  if (pathArray[1] == 'sobre') navAbout.classList.add('text-success')
  if (pathArray[1] == 'politica-monitoramento') navPolicy.classList.add('text-success')
  if (pathArray[1] == 'analise-data') navAnalytic.classList.add('text-success')
  if (pathArray[1] == 'fale-conosco') navContact.classList.add('text-success')
}

export { menu }
