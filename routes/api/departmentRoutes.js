const router = require('express').Router();
const pool = require('../../config/connection.js');
router.get('/all', (req, res) => {
    pool.query('SELECT department.id, department.name FROM department', function (err, {rows}){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json({
            message: 'department success',
            data: rows
        })
    });
});

router.get('/budget/:id', (req, res) => {
    pool.query('SELECT SUM (salary) as total_budget FROM role WHERE role.department = ($1) GROUP BY department;', 
    [req.params.id], function (err, {rows}){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows);
    });
});

router.post('/add', (req, res) => {
    pool.query('INSERT INTO department(name) VALUES($1) RETURNING name, id', [req.body.departmentName], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows)
    });
});

router.delete('/delete/:id', (req,res) => {
    pool.query('DELETE FROM department WHERE department.id = ($1) RETURNING name', [req.params.id], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows)
    })
});

module.exports = router;