  
// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Creates a Connection with the Database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Chui@gt2020",
  database: "employee_tracker_db",
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find employee by Id",
        "Find all employees who appear more than once",
        "Find data within a specific range",
        "Search for a specific role",
        "Find employees with a top salary"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Find employee by role":
       employeeSearch();
        break;

      case "Find all employees who appear more than once":
        multiSearch();
        break;

      case "Find data within a specific range":
        rangeSearch();
        break;

      case "Search for a specific employee":
      roleSearch();
        break;

      case "Find employees with a top salary":
      roleAndAlbumSearch();
        break;
      }
    });
}

function employeeSearch() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "What employee would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, role, year FROM top5000 WHERE ?";
      connection.query(query, { employee: answer employee }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " ||role: " + res[i]role + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT employee FROM top5000 GROUP BY employee HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i] empolyee);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT positionrole employee,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " ||role: " +
              res[i]role +
              " || employee: " +
              res[i] employee +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

functionroleSearch() {
  inquirer
    .prompt({
      name: role",
      type: "input",
      message: "Whatrole would you like to look for?"
    })
    .then(function(answer) {
      console.log(answerrole);
      connection.query("SELECT * FROM top5000 WHERE ?", {role: answerrole }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " ||role: " +
            res[0]role +
            " || employee: " +
            res[0]employee +
        );
        runSearch();
      });
    });
}

functionroleAndAlbumSearch() {
  inquirer
    .prompt({
      name:  "employee",
      type: "input",
      message: "What employee would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_salary.year, top_albums.album, top_albums.position, top5000role, top5000 employee ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums employee = top5000 employee AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums employee = ? AND top5000 employee = ?) ORDER BY top_albums.year, top_albums.position";

      connection.query(query, [answer employee, answer employee], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "Year: " +
              res[i].year +
              " Album Position: " +
              res[i].position +
              " || employee: " +
              res[i] employee +
              " ||role: " +
              res[i]role +
              " || Album: " +
              res[i].album
          );
        }
        runSearch();
      });
    });
}


// Establishes the Connection with the Database
connection.connect((err) => {
  if (err) throw err;

  console.log("We track employees");

  init();
});init = () => {
  inquirer
    .prompt([
      {
        name: "userChoice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "View All Departments",
          "Add Department",
          "Remove Department",
          "Exit",
        ],
        default: "View All Employees",
      },
    ])
    .then((response) => {
      filterFunctions(response.userChoice);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Swtich...case statements that complete the user's requested task
filterFunctions = (userChoice) => {
  let sql = ``;