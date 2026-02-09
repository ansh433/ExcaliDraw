import express from "express";
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from  '@repo/backend-common/config'
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types"
import {SigninSchema} from "@repo/common/types"



const app = express ();

app.post("/signup", (req, res)=> {

    const data = CreateUserSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    res.json({
        userId: "123"
    })

})

app.post("signin", (req, res) =>{

    const data = SigninSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    res.json({
        userId: "123"
    })

})

app.listen(3000);