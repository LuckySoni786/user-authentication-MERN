

const router = require('express').Router();
const auth = require('../middleware/auth.js')
router.get('/', (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ], req.user)
});

module.exports = router;