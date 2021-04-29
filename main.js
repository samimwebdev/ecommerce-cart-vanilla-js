import 'regenerator-runtime/runtime'
import { ui } from './UI'
document.addEventListener('DOMContentLoaded', (e) => {
  //get data from localStorage and show in initial load
  ui.populateCartFromLocalStorage()
  ui.init()

})


