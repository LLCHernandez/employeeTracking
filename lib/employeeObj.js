const inquirer = require('inquirer');
const Route = require('./routeObj.js');

class Employee extends Route {
    constructor(userInput) {
        super(userInput);
    }

    getAll() {
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    console.table(res.data);
                });
            });
    }

    getByManager() {
        let employees = [];
        let employeesId = [];
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    res.data.forEach(employee => {
                        employees.push(`${employee.first_name} ${employee.last_name}`);
                        employeesId.push(employee.id);

                    })
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'managerSearch',
                                message: 'Who is the manager to search by?',
                                choices: employees,
                            },
                        ])
                        .then((answer) => {
                            answer.managerSearch = employeesId[employees.indexOf(answer.managerSearch)];
                            fetch(`http://localhost:3001/api/employee/manager/${answer.managerSearch}`, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                                .then(function (res) {
                                    res.json().then(function (res) {
                                        if (res.rowCount === 0) {
                                            console.log('This employee does not manage anyone.');
                                        } else {
                                            console.table(res.rows);
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

    getByDepartment() {
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
                            fetch(`http://localhost:3001/api/employee/department/${answer.departmentSearch}`, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                                .then(function (res) {
                                    res.json().then(function (res) {
                                        if (res.rowCount === 0) {
                                            console.log('This department does not have any employees.');
                                        } else {
                                            console.table(res.rows);
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

    addNew() {
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
                });
            });

        let employees = [];
        let employeesId = [];
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    res.data.forEach(employee => {
                        employees.push(`${employee.first_name} ${employee.last_name}`);
                        employeesId.push(employee.id);
                    });
                    employees.push('No Manager');
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'employeeFirst',
                                message: 'What is the employee\'s first name?',
                            },
                            {
                                type: 'input',
                                name: 'employeeLast',
                                message: 'What is the employee\'s last name?',
                            },
                            {
                                type: 'list',
                                name: 'employeeRole',
                                message: 'What is the employee\'s role?',
                                choices: roles,
                            },
                            {
                                type: 'list',
                                name: 'employeeManager',
                                message: 'Who is the employee\'s manager?',
                                choices: employees,
                            }
                        ])
                        .then((answer) => {
                            answer.employeeRole = roleId[roles.indexOf(answer.employeeRole)];
                            if(answer.employeeManager === 'No Manager'){
                                answer.employeeManager = null;
                            }else{
                            answer.employeeManager = employeesId[employees.indexOf(answer.employeeManager)]
                            }
                            fetch('http://localhost:3001/api/employee/add', {
                                method: 'POST',
                                body: JSON.stringify(answer),
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                                .then(function (res) {
                                    res.json().then(function (res) {
                                        console.log(`Added ${res.rows[0].first_name} ${res.rows[0].last_name} to the database with id of: ${res.rows[0].id}`);
                                    });
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            });
    }

    update() {
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
                });
            });

        let employees = [];
        let employeesId = [];
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    res.data.forEach(employee => {
                        employees.push(`${employee.first_name} ${employee.last_name}`);
                        employeesId.push(employee.id)
                    });
                    employees.push('No Manager');
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'employeeUpdate',
                                message: 'Who is the employee to update?',
                                choices: employees,
                            },
                            {
                                type: 'list',
                                name: 'employeeRole',
                                message: 'What is the employee\'s role?',
                                choices: roles,
                            },
                            {
                                type: 'list',
                                name: 'employeeManager',
                                message: 'Who is the employee\'s manager?',
                                choices: employees,
                            },
                        ])
                        .then((answer) => {
                            answer.employeeUpdate = employeesId[employees.indexOf(answer.employeeUpdate)];
                            answer.employeeRole = roleId[roles.indexOf(answer.employeeRole)];
                            if(answer.employeeManager === 'No Manager'){
                                answer.employeeManager = null;
                            }else{
                            answer.employeeManager = employeesId[employees.indexOf(answer.employeeManager)]
                            }
                            fetch('http://localhost:3001/api/employee/update', {
                                method: 'PUT',
                                body: JSON.stringify(answer),
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                                .then(function (res) {
                                    res.json().then(function (res) {
                                        console.log(`Updated ${res.rows[0].first_name} ${res.rows[0].last_name} with the role of ${roles[roleId.indexOf(res.rows[0].role)]} and manager ${employees[employeesId.indexOf(res.rows[0].manager)]}.`);
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
        let employees = [];
        let employeesId = [];
        fetch('http://localhost:3001/api/employee/all', {
            method: 'GET'
        })
            .then(function (res) {
                res.json().then(function (res) {
                    res.data.forEach(employee => {
                        employees.push(`${employee.first_name} ${employee.last_name}`);
                        employeesId.push(employee.id)
                    });
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'employeeDelete',
                                message: 'Who is the employee to delete?',
                                choices: employees,
                            }
                        ])
                        .then((answer) => {
                            answer.employeeDelete = employeesId[employees.indexOf(answer.employeeDelete)];
                            fetch(`http://localhost:3001/api/employee/delete/${answer.employeeDelete}`, {
                                method: 'DELETE',
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            })
                                .then(function (res) {
                                    res.json().then(function (res) {
                                        console.log(`${res.rows[0].first_name} ${res.rows[0].last_name} has been deleted.`);
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

module.exports = Employee;