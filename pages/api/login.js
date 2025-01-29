import pool from './db.js'
import bcrypt from "bcryptjs";

export default async function handler (req, res){
   if (req.method !== "POST"){
    return res.status(405).json({message:"method not allowed"});

   }

   const {username, password} = req.body;

   if(!username || !password){
    return res.status(400).json({message:"username and password required"})
   }

   try {
    const [verifyUsername] = await pool.query("SELECT * from users WHERE username = ?", [username])
    const user = verifyUsername[0];
   if(verifyUsername.length > 0){
     const isMatch = await bcrypt.compare(password, user.password)
     if(isMatch){
        return res.json({message: "success"})
     }
   }else{
    return res.status(404).json.send({message: "Invalid credentials"})
   }
   } catch (error) {
    return res.status(500).json({message: "Internal server error"})
   }
}