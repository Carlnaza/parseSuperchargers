document.addEventListener('DOMContentLoaded', () => {
  let elems = document.querySelectorAll('.dropdown-trigger')
  let instances = M.Dropdown.init(elems)
})

document.getElementById('m-five').addEventListener('click', () => {
  localStorage.setItem('radius', 5)
})

document.getElementById('m-ten').addEventListener('click', () => {
  localStorage.setItem('radius', 10)
})

document.getElementById('m-twentyfive').addEventListener('click', () => {
  localStorage.setItem('radius', 25)
})

document.getElementById('m-fifty').addEventListener('click', () => {
  localStorage.setItem('radius', 50)
})