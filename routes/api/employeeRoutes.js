const router = require('express').Router();
const pool = require('../../config/connection.js');
router.get('/all', (req, res) => {
    pool.query('SELECT employee.id, first_name, last_name, CONCAT(first_name, \' \', last_name) as manager, title, salary, department.name as department FROM employee JOIN role ON employee.role = role.id JOIN department on role.department = department.id', function (err, {rows}){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json({
            message: 'employee success',
            data: rows
        })
    });
});

router.get('/manager/:id', (req, res) => {
    pool.query('SELECT (first_name, last_name) FROM employee WHERE employee.manager = ($1);', 
    [req.params.id], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows);
    });
});

router.get('/department/:id', (req, res) => {
    pool.query('SELECT * FROM employee JOIN role ON employee.role = role.id JOIN department ON role.department = department.id WHERE department.id = ($1);', 
    [req.params.id], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows);
    });
});

router.post('/add', (req, res) => {
    pool.query('INSERT into employee (first_name, last_name, role, manager) VALUES ($1, $2, $3, $4) RETURNING first_name, last_name, id', 
    [req.body.employeeFirst, req.body.employeeLast, req.body.employeeRole, req.body.employeeManager], function (err, rows) {
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows);
    });
});

router.put('/update', (req, res) => {
    pool.query('UPDATE employee SET (role, manager) = ($1, $2) WHERE employee.id = ($3) RETURNING first_name, last_name, role, manager',
    [req.body.employeeRole, req.body.employeeManager, req.body.employeeUpdate], function (err, rows) {
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows);
    });
});

router.delete('/delete/:id', (req,res) => {
    pool.query('DELETE FROM employee WHERE employee.id = ($1) RETURNING first_name, last_name', [req.params.id], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows)
    })
});

module.exports = router;