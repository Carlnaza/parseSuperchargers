/*fetch('http://www.mapquestapi.com/search/v2/radius?key=NvL7BXjjF0GsJSCCvUjAGjOo6BAnEMTi&maxMatches=4&origin=39.750307,-104.999472')
  .then(r => r.json())
  .then(res => {
    console.log(res)
  })
  .catch(e => console.error(e))
*/


document.addEventListener('DOMContentLoaded', () => {
  let elems = document.querySelectorAll('.dropdown-trigger')
  let instances = M.Dropdown.init(elems)
})