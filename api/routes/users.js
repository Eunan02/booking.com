import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

router.get("/checkauthentication",verifyToken,(req,res,next) => {
    res.send("Hello user, you are logged in")
})

router.get("/checkuser/:id",verifyUser,(req,res,next) => {
    res.send("Hello user, you are logged in and you can delete you account")
})

router.put("/:id",  updateUser)

    
  

router.delete("/:id",  deleteUser)

router.get("/:id",  getUser)

router.get("/",  getUsers)

export default router