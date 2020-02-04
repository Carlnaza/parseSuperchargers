document.addEventListener('DOMContentLoaded', () => {
  let elems = document.querySelectorAll('.dropdown-trigger')
  let instances = M.Dropdown.init(elems)
})

const pushRadiusToRadiusArray = (rad) => {
  let arr = JSON.parse(localStorage.getItem('radius')) || []
  console.log(arr)
  arr.push(rad)
  localStorage.setItem('radius', JSON.stringify(arr))
}

document.getElementById('m-five').addEventListener('click', () => {
  pushRadiusToRadiusArray(5)
})

document.getElementById('m-ten').addEventListener('click', () => {
  pushRadiusToRadiusArray(10)
})

document.getElementById('m-twentyfive').addEventListener('click', () => {
  pushRadiusToRadiusArray(25)
})

document.getElementById('m-fifty').addEventListener('click', () => {
  pushRadiusToRadiusArray(50)
})