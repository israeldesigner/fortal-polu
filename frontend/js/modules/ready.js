import { script } from './script'
// import { colormode } from './colormode'
// import { teste } from './convert'
// import { tooltip } from './tooltip'
import { leaflet } from './leaflet'
import { mobile } from './mobile'
import { initBootstrap } from './bootstrap'
// import { aside } from './aside'
// import { speech } from './speech'

/**
 * Run event after DOM is ready
 * @param {Function} fn Callback function
 */
function ready(fn) {
  // Sanity check
  if (typeof fn !== 'function') return
  // If document is already loaded, run method
  if (document.readyState === 'interactive' || document.readyState === 'complete') return fn()
  // Otherwise, wait until document is loaded
  document.addEventListener('DOMContentLoaded', fn, false)
}

ready(function () {

  leaflet()
  initBootstrap({
    tooltip: true,
    popover: true,
    toasts: true,
  });
  script()

  let mw = window.matchMedia('(max-width: 768px)')
  mobile(mw)
  mw.addListener(mobile)
})
