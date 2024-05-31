const router = require('express').Router();
const employeeRoutes = require('./employeeRoutes.js');
const roleRoutes = require('./roleRoutes.js');
const departmentRoutes = require('./departmentRoutes.js');
router.use('/employee', employeeRoutes);
router.use('/role', roleRoutes);
router.use('/department', departmentRoutes);
module.exports = router;