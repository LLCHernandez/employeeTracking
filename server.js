const express = require('express');
const routes = require('./routes/index.js');
const inquirer = require('inquirer');
const Department = require('./lib/departmentObj.js');
const Role = require('./lib/roleObj.js');
const Employee = require('./lib/employeeObj.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const department = new Department;
const role = new Role;
const employee = new Employee;

async function getUserInput() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'userInput',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'View Employees By Manager',
                    'View Employees By Department',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                    'Update Employee Role/Manager',
                    'Delete Department',
                    'Delete Role',
                    'Delete Employee',
                    'View Department Budget Total',
                    'Quit',
                ]
            }
        ])
        .then(async (answer) => {
            switch (answer.userInput) {
                
                case 'Quit':
                    console.log('Closing application.')
                    process.exit(1);
                case 'View All Departments':
                    await department.getAll();
                    getUserInput();
                    break;
                case 'View All Roles':
                    await role.getAll();
                    getUserInput();
                    break;
                case 'View All Employees':
                    await employee.getAll();
                    getUserInput();
                    break;
                case 'Add Department':
                    await department.addNew();
                    break;
                case 'Add Role':
                    await role.addNew();
                    break;
                case 'Add Employee':
                    await employee.addNew();
                    break;
                case 'Update Employee Role/Manager':
                    await employee.update();
                    break;
                case 'View Employees By Manager':
                    await employee.getByManager();
                    getUserInput();
                    break;
                case 'View Employees By Department':
                    await employee.getByDepartment();
                    getUserInput();
                    break;
                case 'Delete Department':
                    await department.delete();
                    break;
                case 'Delete Role':
                    await role.delete();
                    break;
                case 'Delete Employee':
                    await employee.delete();
                    break;
                case 'View Department Budget Total':
                    await department.departmentBudget();
                    break;
                default:
                    console.log('error: default case');
                    break;
            }
            
        });

}
getUserInput();