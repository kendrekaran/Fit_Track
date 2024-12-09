const express = require("express")
const {z} = require("zod")
const cors = require("cors")
const ProfileModel = require("./Models/profiles")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json())
app.use(cors()) 

mongoose.connect("mongodb+srv://karan902:I2zUU1l6WKEiB3ai@cluster0.byki5.mongodb.net/Employee")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.post("/register", async (req,res) =>{
    const requiredBody = z.object({
        name : z.string().min(3).max(100),
        email : z.string().min(3).max(100).email(),
        password : z.string().min(3).max(100)
    })
    const parseWithSucess = requiredBody.safeParse(req.body)

    if(!parseWithSucess.success){
        res.json({
            message : "Name or Password Must Contain 3 Characters"
        })
        return;
    }

    const {name,password,email} = req.body
    const hashedPassword = await bcrypt.hash(password,5)

    try{
        await ProfileModel.create({
            name : name , 
            email :email,
            password : hashedPassword   
        })
    } catch(error){
        res.status(403).json({
            
            message : "Error Durng Registration",
            error:error.message
        })
    }

    res.json({
        message : "You are signed up"
    })
    
})

app.post("/login" ,async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user =await ProfileModel.findOne({email : email})
        if(!user){
            return res.status(404).json({ message : "User Not Found"})
        }
        const isPasswrdValid = await bcrypt.compare(password, user.password)
        

        if(!isPasswrdValid){
            return res.status(401).json({message : "Invalid Credentials"})
        }

        const token = jwt.sign({
            userId: user._id,
            name: user.name, 
            email: user.email
        },"secret",{expiresIn:"1hr"})

        res.status(200).json({message:"Login Successful",
            token,
            user: { 
                name: user.name,
                email: user.email
            }
        })
    } catch(error){
        res.status(500).json({message:"Error Logging in", error})
    }

})

app.listen(3000,() =>{
    console.log("Server is Running")
})