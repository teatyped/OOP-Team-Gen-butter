const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateTeam = require("./src/page.template.js");
const teamArr = [];

init();

function init() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "isRole",
        message: "Would you like to fill a position?",
      },
    ])
    .then(({ isRole }) => {
      isRole ? fillRole() : createHTML();
    });
}

function fillRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which position would you like to fill?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(({ role }) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "What is the employee's name?",
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter the employee's name.");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "id",
            message: "What is the employee's id?",
            validate: (idInput) => {
              if (idInput) {
                return true;
              } else {
                console.log("Please enter the employee's id.");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "email",
            message: "What is the employee's e-mail?",
            validate: (emailInput) => {
              if (emailInput) {
                return true;
              } else {
                console.log("Please enter the employee's e-mail.");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            validate: (officeInput) => {
              if (officeInput) {
                return true;
              } else {
                console.log("Please enter the manager's office number.");
                return false;
              }
            },
            when: role == "Manager",
          },
          {
            type: "input",
            name: "github",
            message: "What is the engineer's github profile?",
            validate: (githubInput) => {
              if (githubInput) {
                return true;
              } else {
                console.log("Please enter the engineer's github profile.");
                return false;
              }
            },
            when: role == "Engineer",
          },
          {
            type: "input",
            name: "school",
            message: "What is the intern's school name?",
            validate: (schoolInput) => {
              if (schoolInput) {
                return true;
              } else {
                console.log("Please enter the intern's school name.");
                return false;
              }
            },
            when: role == "Intern",
          },
        ])
        .then((ans) => {
          if (role == "Manager") {
            const manager = new Manager(
              ans.name,
              ans.id,
              ans.email,
              ans.officeNumber
            );
            teamArr.push(manager);
          } else if (role == "Engineer") {
            const engineer = new Engineer(
              ans.name,
              ans.id,
              ans.email,
              ans.github
            );
            teamArr.push(engineer);
          } else {
            const intern = new Intern(ans.name, ans.id, ans.email, ans.school);
            teamArr.push(intern);
          }
        })
        .then(init);
    });
}

function createHTML() {
  fs.writeFile("./dist/team.html", generateTeam(teamArr), (error) => {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("Success! The HTML file for your team has been created!");
    }
  });
  fs.copyFile("./src/style.css", "./dist/style.css", (error) => {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("The CSS file for your HTML has been successfully created!");
    }
  });
}
