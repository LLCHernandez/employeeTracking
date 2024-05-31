const inquirer = require('inquirer');
const Route = require('./routeObj.js');

class Department extends Route {
    constructor(userInput) {
        super(userInput);
    }

    getAll() {
        fetch('http://localhost:3001/api/department/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    console.table(res.data);
                });
            });
    };

    addNew() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the name of the department?',
                }
            ])
            .then((answer) => {
                fetch('http://localhost:3001/api/department/add', {
                    method: 'POST',
                    body: JSON.stringify(answer),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then(function (res) {
                        res.json().then(function (res) {
                            console.log(`Added ${res.rows[0].name} to the database with id of: ${res.rows[0].id}`);
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    departmentBudget() {
        let departments = [];
        let departmentId = [];
        fetch('http://localhost:3001/api/department/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    res.data.forEach(department => {
                        departments.push(department.name);
                        departmentId.push(department.id);
                    })
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'departmentSearch',
                                message: 'What is the department to search by?',
                                choices: departments,
                            },
                        ])
                        .then((answer) => {
                            answer.departmentSearch = departmentId[departments.indexOf(answer.departmentSearch)];
                            fetch(`http://localhost:3001/api/department/budget/${answer.departmentSearch}`, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                                .then(function (res) {
                                    res.json().then(function (res) {
                                        console.log(res);
                                        if (res.length === 0) {
                                            console.log('This department does not have any employees.');
                                        } else {
                                            console.table(res);
                                        }
                                    });
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            });

    }

    delete() {
        let departments = [];
        let departmentId = [];
        console.log('add new role called');
        fetch('http://localhost:3001/api/department/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    res.data.forEach(department => {
                        departments.push(department.name);
                        departmentId.push(department.id);
                    })
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'departmentDelete',
                                message: 'What is the department to delete?',
                                choices: departments,
                            },
                        ])
                        .then((answer) => {
                            answer.departmentDelete = departmentId[departments.indexOf(answer.departmentDelete)];
                            fetch(`http://localhost:3001/api/department/delete/${answer.departmentDelete}`, {
                                method: 'DELETE',
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                                .then(function (res) {
                                    res.json().then(function (res) {
                                        console.log(`${res.rows[0].name} has been deleted.`);
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
module.exports = Department;