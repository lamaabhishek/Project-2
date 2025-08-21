let employees = [
  { id: 1, name: "Jane Doe", email: "jane@example.com", department: "HR", position: "Manager", salary: 65000 }
];
let idCounter = 2;

// Form submission
document.getElementById("employeeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const employee = {
    id: idCounter++,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    position: document.getElementById("position").value,
    department: document.getElementById("department").value,
    salary: document.getElementById("salary").value
  };

  employees.push(employee);
  saveToLocalStorage();
  renderTable();
  this.reset();
});

// Render table
function renderTable(filteredEmployees = employees) {
  const table = document.getElementById("employeeTable");
  table.innerHTML = "";
  filteredEmployees.forEach(emp => {
    const row = `<tr>
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.department}</td>
      <td>${emp.position}</td>
      <td>${emp.salary}</td>
      <td><button onclick="deleteEmployee(${emp.id})">Delete</button></td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Delete employee
function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  saveToLocalStorage();
  renderTable();
}

// Search filter (includes position)
document.getElementById("searchInput").addEventListener("keyup", function() {
  const query = this.value.toLowerCase();
  const filtered = employees.filter(emp => 
    emp.name.toLowerCase().includes(query) ||
    emp.department.toLowerCase().includes(query) ||
    emp.position.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

// LocalStorage persistence
function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("employees");
  if (data) {
    employees = JSON.parse(data);
    idCounter = employees.length ? employees[employees.length - 1].id + 1 : 1;
  }
  renderTable();
}

window.onload = loadFromLocalStorage;
