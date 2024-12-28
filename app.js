const inquirer = require("inquirer");
const pool = require("./db");

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "View all departments":
      await viewDepartments();
      break;
    case "View all roles":
      await viewRoles();
      break;
    case "View all employees":
      await viewEmployees();
      break;
    case "Add a department":
      await addDepartment();
      break;
    case "Add a role":
      await addRole();
      break;
    case "Add an employee":
      await addEmployee();
      break;
    case "Update an employee role":
      await updateEmployeeRole();
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit();
  }

  mainMenu();
};

const viewDepartments = async () => {
  const result = await pool.query("SELECT * FROM department");
  console.table(result.rows);
};

const viewRoles = async () => {
  const query = `
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
    `;
  const result = await pool.query(query);
  console.table(result.rows);
};

const viewEmployees = async () => {
  const query = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
               department.name AS department, role.salary,
               CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `;
  const result = await pool.query(query);
  console.table(result.rows);
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]);
  const result = await pool.query(
    "INSERT INTO department (name) VALUES ($1) RETURNING *",
    [name]
  );
  console.log("Added department:", result.rows[0]);
};

const addRole = async () => {
  const departments = await pool.query("SELECT * FROM department");
  const departmentChoices = departments.rows.map((d) => ({
    name: d.name,
    value: d.id,
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter the title of the role:" },
    { type: "input", name: "salary", message: "Enter the salary of the role:" },
    {
      type: "list",
      name: "departmentId",
      message: "Select a department:",
      choices: departmentChoices,
    },
  ]);
  const result = await pool.query(
    "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *",
    [title, salary, departmentId]
  );
  console.log("Added role:", result.rows[0]);
};

const addEmployee = async () => {
  const roles = await pool.query("SELECT * FROM role");
  const employees = await pool.query("SELECT * FROM employee");

  const roleChoices = roles.rows.map((r) => ({ name: r.title, value: r.id }));
  const managerChoices = employees.rows.map((e) => ({
    name: `${e.first_name} ${e.last_name}`,
    value: e.id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the last name of the employee:",
    },
    {
      type: "list",
      name: "roleId",
      message: "Select the role:",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "managerId",
      message: "Select the manager:",
      choices: managerChoices,
    },
  ]);
  const result = await pool.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, roleId, managerId]
  );
  console.log("Added employee:", result.rows[0]);
};

const updateEmployeeRole = async () => {
  const employees = await pool.query("SELECT * FROM employee");
  const roles = await pool.query("SELECT * FROM role");

  const employeeChoices = employees.rows.map((e) => ({
    name: `${e.first_name} ${e.last_name}`,
    value: e.id,
  }));
  const roleChoices = roles.rows.map((r) => ({ name: r.title, value: r.id }));

  const { employeeId, newRoleId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select the employee:",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "newRoleId",
      message: "Select the new role:",
      choices: roleChoices,
    },
  ]);

  const result = await pool.query(
    "UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *",
    [newRoleId, employeeId]
  );
  console.log("Updated employee:", result.rows[0]);
};

// Start the application
mainMenu();
