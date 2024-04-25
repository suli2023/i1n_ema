const doc = {
    empBody: document.querySelector("#empBody"),
    addButton: document.querySelector("#addButton"),
    idInput: document.querySelector("#id"),
    nameInput: document.querySelector("#name"),
    cityInput: document.querySelector("#city"),
    salaryInput: document.querySelector("#salary")
}

const state = {
    url: 'http://localhost:8000/employees',
    name: 'névtelen',
    city: 'ismeretlen',
    salary: 300,
    add: true
}


doc.addButton.addEventListener('click', () => {
    console.log('Hozzáadás...')    
    getDataFromForm()
    createEmployee()
    deleteModalContent()    
    getEmployees()
})

function startAdding() {
    deleteModalContent();
}

function getDataFromForm() {
    state.name = doc.nameInput.value
    state.city = doc.cityInput.value
    state.salary = doc.salaryInput.value
}

function createEmployee() {
    fetch(state.url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            name: state.name,
            city: state.city,
            salary: state.salary
        })
    })
}

function getEmployees() {
    fetch(state.url)
    .then( response => response.json())
    .then(result => {
        // console.log(result)
        clearTableContent()
        renderEmployees(result)
    })
}

function renderEmployees(employeeList) {
    
    employeeList.forEach(emp => {
        console.log(emp.salary)
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
            <td>
                <button 
                    class="btn btn-primary"
                    data-id="${emp.id}"
                    data-name="${emp.name}"
                    data-city="${emp.city}"
                    data-salary="${emp.salary}"
                    data-bs-toggle="modal" data-bs-target="#operatorModal"
                    onclick="startEdit(this)">
                    <i class="bi bi-pencil"></i>
                </button>
                <button
                    class="btn btn-danger"
                    onclick="startDelete(${emp.id})">
                    
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `
        doc.empBody.appendChild(row)
    });
    
}

function deleteModalContent() {
    doc.idInput.value = ''
    doc.nameInput.value = ''
    doc.cityInput.value = ''
    doc.salaryInput.value = ''
}

function clearTableContent() {
    doc.empBody.textContent = ''
}

function startDelete(id) {
    console.log('törlendő:', id)
    deleteEmployee(id)
    getEmployees()
}

function deleteEmployee(id) {
    let newUrl = state.url + '/'+id
    fetch(newUrl, {
        method: 'delete'
    })
}

function startEdit(source) {
    console.log("Szerkesztés ...")    
    doc.idInput.value = source.dataset.id
    doc.nameInput.value = source.dataset.name
    doc.cityInput.value = source.dataset.city
    doc.salaryInput.value = source.dataset.salary

}

getEmployees()
