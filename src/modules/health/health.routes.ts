import {pingHandler} from "./health.controller.js";
import {Router} from "express";

const router = Router()

router.get('/ping', pingHandler);

export {router as healthRouter};