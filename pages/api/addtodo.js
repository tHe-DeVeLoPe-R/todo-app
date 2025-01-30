import pool from './db.js'

export default async function handler (req, res){
   if (req.method !== "POST"){
    return res.status(405).json({message:"method not allowed"});

   }
  
   const {title, desc, username} = req.body;
  
   if(!title || !desc ){
    return res.status(400).json({message:"All fields required"})
   }

   try {
    const [addTodo] = await pool.query("INSERT INTO todos (username, title, description) VALUES (?,?,?)", [username, title, desc])
    
       if(addTodo){
        return res.json({message: "success"})
     }
  
   } catch (error) {
    return res.status(500).json({message: "Internal server error"})
   }
}