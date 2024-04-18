const doc = {
    empBody: document.querySelector("#empBody"),
    addButton: document.querySelector("#addButton")
}

const state = {
    url: 'http://localhost:8000/employees'
}


doc.addButton.addEventListener('click', () => {
    console.log('műkődik')
    createEmployee()
})

function createEmployee() {
    fetch(state.url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            name: "Valaki",
            city: "Valahol",
            salary: 300
        })
    })
}

function getEmployees() {
    fetch(state.url)
    .then( response => response.json())
    .then(result => {
        // console.log(result)
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
                    class="btn btn-primary">
                    Szerkesztés
                </button>
                <button
                    class="btn btn-danger">
                    Törlés
                </button>
            </td>
        `
        doc.empBody.appendChild(row)
    });
    
}

getEmployees()
