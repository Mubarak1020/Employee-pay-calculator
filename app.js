let employees = [];

let isEditing = false;
let editingIndex = -1;

window.onload = function() {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
        employees = JSON.parse(storedEmployees);
        displayEmployees();
    }
};

function addOrUpdateEmployee() {
    const employeeId = document.getElementById("employeeId").value;
    const employeeName = document.getElementById("employeeName").value;
    const basicPay = parseFloat(document.getElementById("basicPay").value);

    const existingEmployeeIndex = employees.findIndex((emp, index) =>
        emp.employeeId === employeeId && index !== editingIndex
    );

    if (existingEmployeeIndex !== -1) {
        alert("This ID already exists.");
        return;
    }

    const hra = basicPay * 0.20;
    const tax = basicPay * 0.18;
    const netPay = basicPay + hra - tax;

    if (isEditing) {
        employees[editingIndex] = { employeeId, employeeName, basicPay, hra, tax, netPay };
        document.getElementById("addButton").innerText = "Add";
        isEditing = false;
        editingIndex = -1;
    } else {
        employees.push({ employeeId, employeeName, basicPay, hra, tax, netPay });
    }
    saveEmployeesToLocalStorage();
    displayEmployees();
    clearForm();
}
function displayEmployees() {
    const employeeList = document.getElementById("employeeList");
    employeeList.innerHTML = "";
    
    employees.forEach((employee, index) => {
        const employeeCard = document.createElement("div");
        employeeCard.className = "card mb-3";
        employeeCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"> ID: ${employee.employeeId}</h5>
                <h5 class="card-title">Name: ${employee.employeeName} </h5>
                <p class="card-text">
                    <strong>Basic Pay:</strong> Rs.${employee.basicPay.toFixed(2)}<br>
                    <strong>H.R.A:</strong> Rs.${employee.hra.toFixed(2)}<br>
                    <strong>Tax:</strong> Rs.${employee.tax.toFixed(2)}<br>
                    <strong>Net Pay:</strong> Rs.${employee.netPay.toFixed(2)}
                </p>
                <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
            </div>
        `;
        employeeList.appendChild(employeeCard);
    });
}
function editEmployee(index) {
    const employee = employees[index];
    document.getElementById("employeeId").value = employee.employeeId;
    document.getElementById("employeeName").value = employee.employeeName;
    document.getElementById("basicPay").value = employee.basicPay;
    
    document.getElementById("addButton").innerText = "Update";
    isEditing = true;
    editingIndex = index;
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    saveEmployeesToLocalStorage();
    displayEmployees();
}

function clearForm() {
    document.getElementById("employeeForm").reset();
    document.getElementById("addButton").innerText = "Add";
    isEditing = false;
    editingIndex = -1;
}
function saveEmployeesToLocalStorage(){
    localStorage.setItem("employees", JSON.stringify(employees));
}