const User = require('../models/usermodel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register=async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const existingUser= await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({msg:'user already exists'})
        }
        const hashpassword= await bcrypt.hash(password,10)

        const newUser= await User.create({name,email,password:hashpassword})

        res.status(201).json({ msg: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await User.findOne({email})
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' })
        const isMatch= await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({token,user:{id:user._id,name:user.name,email:user.email}})
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUser=async(req,res)=>{
    try {
        const user= await User.findById(req.user.id).select("name email")
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }
        return res.json({ name: user.name, email: user.email })
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
}