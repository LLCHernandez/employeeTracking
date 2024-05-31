const inquirer = require('inquirer');
const Route = require('./routeObj.js');

class Role extends Route {
    constructor(userInput){
        super(userInput);
    }

    getAll() {
        fetch('http://localhost:3001/api/role/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                console.log('\n\n\n')
                console.table(res.data);
                
            });
        })
    };

    addNew() {
        let departments = [];
        let id = [];
        fetch('http://localhost:3001/api/department/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                res.data.forEach(department => {
                    departments.push(department.name);
                    id.push(department.id);
                })
            inquirer
                .prompt([
                    {
                        type:'input',
                        name: 'roleTitle',
                        message: 'What is the name of the role?',
                    },
                    {
                        type:'input',
                        name: 'roleSalary',
                        message: 'What is the salary of the role?',
                    },
                    {
                        type:'list',
                        name: 'roleDepartment',
                        message: 'What is the department of the role?',
                        choices: departments,
                    },
                ])
                .then((answer)  => {
                    answer.roleDepartment = id[departments.indexOf(answer.roleDepartment)];
                    fetch('http://localhost:3001/api/role/add', {
                        method: 'POST',
                        body: JSON.stringify(answer),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    .then(function (res) {
                        res.json().then(function (res) {
                            console.log(`Added ${res.rows[0].title} to the database with id of: ${res.rows[0].id}`);
                        });
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            })
        });
    }

    delete() {
        let roles = [];
        let roleId = [];
        fetch('http://localhost:3001/api/role/all', {
            method: 'GET'
        })
        .then(function (res) {
            res.json().then(function (res) {
                res.data.forEach(role => {
                    roles.push(role.title);
                    roleId.push(role.id);
                });
            inquirer
                .prompt([
                    {
                        type:'list',
                        name:'roleDelete',
                        message: 'What is the role to delete?',
                        choices: roles,
                    }
                ])
                .then((answer)  => {
                    answer.roleDelete = roleId[roles.indexOf(answer.roleDelete)];
                    fetch(`http://localhost:3001/api/role/delete/${answer.roleDelete}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    .then(function (res) {
                        res.json().then(function (res) {
                            console.log(`${res.rows[0].title} has been deleted.`);
                        });
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            });
        });
        
    }
}

module.exports = Role;