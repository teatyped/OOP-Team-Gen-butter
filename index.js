const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateTeam = require("./src/page.template.js");
const { writeFile, copyFile } = require("./utils/genrate-site");
const roles = { Manager: [], Engineer: [], Intern: [] };
const teamArr = [];


init();

function init() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "isRole",
      message: "Would you like to fill a position?",
    },
  ]).then(({ isRole }) => {
    isRole ? fillRole() : createHTML();
  });
}

function fillRole() {
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Which position would you like to fill?",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ]).then(({ role }) => {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee's e-mail?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        when: role == "Manager",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's github profile?",
        when: role == "Engineer",
      },
      {
        type: "input",
        name: "school",
        message: "What is the intern's school name?",
        when: role == "Intern",
      },
    ])
      .then((ans) => {
        // role == "Manager"
        //   ? teamArr.push(new Manager(ans.name, ans.id, ans.email, ans.officeNumber))
        //   : role == "Engineer"
        //   ? roles.Engineer.push(new Engineer(...Object.values(ans)))
        //   : roles.Intern.push(new Intern(...Object.values(ans)));
        if (role == "Manager"){
          const manager = new Manager(ans.name, ans.id, ans.email, ans.officeNumber)
          teamArr.push(manager);
        } else if (role == "Engineer"){
          const engineer = new Engineer(ans.name, ans.id, ans.email, ans.github)
          teamArr.push(engineer);
        } else {
          const intern = new Intern(ans.name, ans.id, ans.email, ans.school)
          teamArr.push(intern);
        }
      })
      .then(init);
  });
}

function createHTML() {
  fs.writeFile('./dist/team.html', generateTeam(teamArr), (error) => {
      if (error) {
          console.log(error);
          return;
      } else {
          console.log('Success! The HTML file for your team has been created!');
      }
  });
  fs.copyFile('./src/style.css', './dist/style.css', (error) => {
      if (error) {
          console.log(error);
          return;
      } else {
          console.log('The CSS file for your HTML has been successfully created!');
      }
  });
}






    

