const Router = require('express');
const router = Router();

// Import routes
const authRoutes = require('./modules/auth/routes/auth.routes');
const financesRoutes = require('./modules/finances/routes/finances.routes');
const dateRoutes = require('./modules/dates/routes/dates.routes');

// status api endpoint
router.get('/api-status',(req,res)=>{
    return res.send({'Status':'on'})
})

// User routes
router.use(authRoutes);
router.use(financesRoutes);
router.use(dateRoutes);

module.exports = router;