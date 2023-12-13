import express from "express";
import axios from "axios";
const router = express.Router();
import * as fs from "fs";
import getRoutes from "./getRoutes.js"
import postRoutes from "./postRoutes.js"

//Route to authenticate user and see if they accept permission to access there data.
router.use("/get", getRoutes)
router.use("/post", postRoutes)


export default router;
