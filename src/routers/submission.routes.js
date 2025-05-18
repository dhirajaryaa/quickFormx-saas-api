import { Router } from "express";
import authorizedRoutes from "../middlewares/auth.middleware.js";
import saveNewSubmission from "../controllers/submission/create.controller.js";
import getAllSubmissions from "../controllers/submission/getAllSubmission.controller.js";

const submissionRouter = Router();

// create new submission
submissionRouter.post("/",saveNewSubmission);
// get submissions
submissionRouter.get("/responses",authorizedRoutes,getAllSubmissions);

export default submissionRouter;
