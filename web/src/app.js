//const { name } = require("browser-sync")


const tbody = document.querySelector('#tbody')
const saveButton = document.querySelector('#saveButton')

const idInput = document.querySelector('#id')
const nameInput = document.querySelector('#name')
const cityInput = document.querySelector('#city')
const salaryInput = document.querySelector('#salary')

//Read
const url = 'http://localhost:8000/api/employees'

function getEmployees() {
  fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    console.log(result)  
    renderTbody(result.data)
  });

}

getEmployees()

function renderTbody(empList) {
  var tbodyContent = '';
  empList.forEach((emp) => {
    var row = `
    <tr>
      <td>${emp.id}</td>      
      <td>${emp.name}</td>      
      <td>${emp.city}</td>      
      <td>${emp.salary}</td>
    </tr>
    `;    
    tbodyContent += row;
  })
  tbody.innerHTML = tbodyContent
  

}

// Create művelet

saveButton.addEventListener('click', () => {

  //JavaScript objektum
  const emp = {
    name: nameInput.value,
    city: cityInput.value,
    salary: salaryInput.value
  }
  addEmployee(emp)
  clearFields()
  getEmployees()

})

function clearFields() {
  idInput.value =''
  nameInput.value =''
  cityInput.value = ''
  salaryInput.value = ''
}

function addEmployee(emp) {
console.log(emp)
fetch(url, {
  method: 'POST',
  body: JSON.stringify(emp),
  headers: {
    'Content-Type': 'application/json'
  }

})
.then(response => response.json())
.then(result => {
 console.log(result)
 getEmployees()
})
.catch(err => console.log(err))

}