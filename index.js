const inquirer = require('inquirer');
const fs = require('fs');
const generateTeam = require('./src/page.template.js');
const { writeFile, copyFile } = require('./utils/generate-site');

// toDo 
// - promp user for emplyee info
// - base on employee role call that role generate function






const promptEmployeeInfo = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the team managers name',
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('Please enter the team managers name');
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'ID',
            message: 'Enter your employee ID',
            validate: IdInput => {
              if (IdInput) {
                return true;
              } else {
                console.log('Please enter an employee ID!');
                return false;
              }
            }
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter your employee email',
            validate: emailInput => {
              if (emailInput) {
                return true;
              } else {
                console.log('Please enter an employee email!');
                return false;
              }
            }
          },
          {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter your office number',
            validate: numberInput => {
              if (numberInput) {
                return true;
              } else {
                console.log('Please enter an office number!');
                return false;
              }
            }
          },
          
    ]) // prompt end


}// prompt end


const promptEngineer = () =>{

}

const promptIntern = () => {
    
}

promptEmployeeInfo();
