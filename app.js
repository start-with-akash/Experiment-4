const fs = require("fs");
const readline = require("readline");

const FILE = "employees.json";

// Load employees from file
let employees = [];
if (fs.existsSync(FILE)) {
    employees = JSON.parse(fs.readFileSync(FILE));
}

// Save employees to file
function saveData() {
    fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

// CLI setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Menu
function menu() {
    console.log("\n===== Employee Management System =====");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Enter choice: ", handleMenu);
}

// Add Employee
function addEmployee() {
    rl.question("Enter ID: ", (id) => {
        rl.question("Enter Name: ", (name) => {
            rl.question("Enter Salary: ", (salary) => {

                if (!id || !name || isNaN(salary)) {
                    console.log("Invalid input!");
                    return menu();
                }

                employees.push({ id, name, salary: Number(salary) });
                saveData();
                console.log("Employee Added!");
                menu();
            });
        });
    });
}

// View Employees
function viewEmployees() {
    console.log("\nEmployee List:");
    console.table(employees);
    menu();
}

// Update Employee
function updateEmployee() {
    rl.question("Enter Employee ID to update: ", (id) => {
        let emp = employees.find(e => e.id === id);

        if (!emp) {
            console.log("Employee not found!");
            return menu();
        }

        rl.question("Enter New Name: ", (name) => {
            rl.question("Enter New Salary: ", (salary) => {

                if (name) emp.name = name;
                if (!isNaN(salary)) emp.salary = Number(salary);

                saveData();
                console.log("Employee Updated!");
                menu();
            });
        });
    });
}

// Delete Employee
function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", (id) => {
        const index = employees.findIndex(e => e.id === id);

        if (index === -1) {
            console.log("Employee not found!");
        } else {
            employees.splice(index, 1);
            saveData();
            console.log("Employee Deleted!");
        }

        menu();
    });
}

// Handle Menu Choice
function handleMenu(choice) {
    switch (choice) {
        case "1": addEmployee(); break;
        case "2": viewEmployees(); break;
        case "3": updateEmployee(); break;
        case "4": deleteEmployee(); break;
        case "5":
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice!");
            menu();
    }
}

// Start program
menu();
