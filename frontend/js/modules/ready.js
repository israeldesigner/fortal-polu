import { leaflet } from './leaflet'
import { mobile } from './mobile'
import { initBootstrap } from './bootstrap'
import { scrollFunc } from './scroll'
import { acessibility } from './contrast'
import { fontSize } from './fontSize'
import { menu } from './menu'
import { chartAnalytcs } from './chartjs'

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
  chartAnalytcs()
  initBootstrap({
    tooltip: true,
    popover: true,
    toasts: true,
  })
  scrollFunc()
  fontSize()
  menu()
  acessibility()

  let mw = window.matchMedia('(max-width: 768px)')
  mobile(mw)
  mw.addListener(mobile)
})
