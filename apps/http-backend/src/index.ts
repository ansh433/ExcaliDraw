import express from "express";
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from  '@repo/backend-common/config'
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types"



const app = express ();

app.post("/signup", (req, res)=> {

})

app.post("signin", (req, res) =>{

})

app.listen(3000);