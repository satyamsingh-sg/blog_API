const express = require("express");
const router = express.Router();

router.get("/question", (req, res) => {
    res.status(200).json({
        message: "This is question get route",
    });
});

module.exports = router;