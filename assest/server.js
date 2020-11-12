
  
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Chui@gt2020",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("connection has begun");
    start();
});

function start() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Role", "Exit"]
        }).then(({ selection }) => {      // used destructuring to access key
            // based on their answer, either call the bid or the post functions
            //use a switch case to determine which function executes
            switch (selection) {
                case "View all Departments":
                    return viewDepartment();
                    break;
                case "View all Roles":
                    return viewRoles();
                    break;
                case "View all Employees":
                    return viewEmployees();
                    break;
                case "Add a Department":
                    return addDepartment();
                    break;
                case "Add a Role":
                    return addRole();
                    break;
                case "Add an Employee":
                    return addEmployee();
                    break;
                case "Update Role":
                    return updateRole();
                    break;
                default:
                    console.log("Goodbye");
                    connection.end();
            }
        })
}

function viewDepartment() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function addDepartment() {
    //use inquirer to ask the user what department they would like to add
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the department's name:",
            // validate: validateString
        }
        //in the promise of inquirer add the department to the DB and the view all departments
    ]).then(function (data) {
        var newDepartment = data.department;
        var query = "INSERT INTO department(name) VALUE (?)";

        connection.query(query, newDepartment, function (err) {
            if (err) throw err;

            console.log("Your new department has been added.");
            viewDepartment();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter role name?"
        },
        {
            type: "input",
            name: "salary",
            message: "what's the salary? "
        },
        {
            type: "input",
            name: "departmentId",
            message: "What's the department id?"
        }
        //in the promise of inquirer add the department to the DB and the view all departments
    ]).then(function (data) {
        var newTitle = data.title;
        var newSalary = data.salary;
        var newDepartmentId = data.departmentId;
        var query = "INSERT INTO role (title,salary,department_id) VALUE (?,?,?)";

        connection.query(query, [newTitle, newSalary, newDepartmentId], function (err) {
            if (err) throw err;

            console.log("Your new roles have been added.");
            viewRoles();
        });
    });

}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter last name? "
        },
        {
            type: "input",
            name: "roleId",
            message: "Whats the role id?"
        },
        {
            type: "input",
            name: "managerId",
            message: "Whats the manager id?"
        }

        //in the promise of inquirer add the department to the DB and the view all departments
    ]).then(function (data) {
        var newFirstName = data.firstName;
        var newLastName = data.lastName;
        var newRoleId = data.roleId;
        var newManagerId = data.managerId;
        var query = "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUE (?,?,?,?)";

        connection.query(query, [newFirstName, newLastName, newRoleId, newManagerId], function (err) {
            if (err) throw err;

            console.log("Your new roles have been added.");
            viewEmployees();
        });
    });
}

function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "newFirstName",
            message: "Enter new first name?"
        },
        {
            type: "input",
            name: "newLastName",
            message: "Enter new last name? "
        },
        {
            type: "input",
            name: "newRoleId",
            message: "Whats the new role id?"
        },
        {
            type: "input",
            name: "newRoleId",
            message: "Whats the new role id?"
        }

    ]).then(function (data) {
        var newFirstName = data.firstName;
        var newLastName = data.lastName;
        var newRoleId = data.roleId;
        var query = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";

        connection.query(query, [newRoleId, newFirstName, newLastName], function (err) {
            if (err) throw err;

            console.log("Your new roles have been added.");
            viewEmployees();
        });
    });
}

// var query = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";