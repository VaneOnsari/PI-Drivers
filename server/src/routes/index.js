const { Router } = require("express");
const driversRouter = require("./driversRouter");
const teamsRouters = require("./teamsRouter");

const router = Router();

router.use("/drivers", driversRouter);
router.use("/teams", teamsRouters);

module.exports = router;
