import express from "express";
import { createMessage, checkConnection } from "./lib/firebase-functions.js";

const VERSION = "v1";

const app = express()
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT)
    console.log("NODE_ENV=", process.env.NODE_ENV)
})

app.get(`/${VERSION}/verify`, async (req, res) => {
    try{
        const isConnected = await checkConnection()
        if(isConnected){
            console.log("Connection verified")
            res.status(200).send("Connection verified")
            return
        }else{
            console.error("Connection error")
            res.status(500).send("Connection error")
            return
        }
    }catch(e){
        console.error("Error verifying connection: ", e)
        res.status(500).send("Connection error with exception")
        return
    }
})


app.post(`/${VERSION}/create`, async (req, res) =>{
    const {email, name, message} = req.body;
    
    if(!name || !email || !message){
        res.status(400).send("Missing required fields")
        return
    }
    console.table({name, email, message})
    try{
        await createMessage({ name, email, message })
        res.status(200).send("Message sent")
        return
    }
    catch(e){
        console.error("Error sending message: ", e)
        res.status(500).send("Error sending message")
        return
    }
})