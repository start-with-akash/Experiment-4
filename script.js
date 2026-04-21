let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Display employees
function displayEmployees() {
    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    employees.forEach((emp, index) => {
        table.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.salary}</td>
                <td>
                    <button onclick="editEmployee(${index})">Edit</button>
                    <button onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    localStorage.setItem("employees", JSON.stringify(employees));
}

// Add employee
function addEmployee() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const salary = document.getElementById("salary").value;

    if (!id || !name || salary === "" || isNaN(salary)) {
        alert("Invalid Input!");
        return;
    }

    employees.push({ id, name, salary });
    clearFields();
    displayEmployees();
}

// Delete employee
function deleteEmployee(index) {
    employees.splice(index, 1);
    displayEmployees();
}

// Edit employee
function editEmployee(index) {
    const emp = employees[index];

    document.getElementById("id").value = emp.id;
    document.getElementById("name").value = emp.name;
    document.getElementById("salary").value = emp.salary;

    deleteEmployee(index);
}

// Clear input fields
function clearFields() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("salary").value = "";
}

// Initial display
displayEmployees();
