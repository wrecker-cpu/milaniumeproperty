const requirementController = require("../controllers/RequireController");
const auth = require("../auth/AuthValidation");
const router = require("express").Router();

router.post("/", requirementController.addRequirement);
router.get("/", requirementController.getAllRequirement);
router.get("/:id", requirementController.getRequirementbyID);
router.get("/requirement/get-excel", requirementController.getExcelForRequirement);
router.put("/:id", requirementController.updateRequirement);
router.delete("/:id", requirementController.deleteRequirement);
router.put(
  "/requirement/updateAll",
  requirementController.updateAllRequirement
);
module.exports = router;
