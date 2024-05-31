const router = require('express').Router();
const pool = require('../../config/connection.js');
router.get('/all', (req, res) => {
    pool.query('SELECT role.id, title, salary, department.name as department FROM role JOIN department ON role.department = department.id', function (err, {rows}){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json({
            message: 'role success',
            data: rows
        })
    });
});

router.post('/add', (req, res) => {
    pool.query('INSERT INTO role(title, salary, department) VALUES($1, $2, $3) RETURNING title, id', 
    [req.body.roleTitle, req.body.roleSalary, req.body.roleDepartment ], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows)
    });
});

router.delete('/delete/:id', (req,res) => {
    pool.query('DELETE FROM role WHERE role.id = ($1) RETURNING title', [req.params.id], function (err, rows){
        if(err){
            res.status(err).json({error:err.message});
        }
        res.json(rows)
    })
});

module.exports = router;