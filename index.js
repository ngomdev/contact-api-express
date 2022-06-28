
const express = require('express');
const db = require("./db.js")
const app = express();
const PORT = 3000;

// middlewar

app.use(express.urlencoded({extended : false}))
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  //res.send("L'API marche bien 😉");
  res.json({Message :"L'API marche bien 😉"})
 
});

// lister les contactes

app.get('/api/contacts',(req,res) =>{
    const sql = "SELECT * FROM contact";
    const params = [];
    db.all(sql,(err,rows) => {
        if(err){
            console.log(err);
            res.status(400).json({error : err.message });
            return
        }
        res.json({Message : "Listes des contacts", data: rows});

    })

})

// Afficher un contact avec id
app.get('/api/contacts:id',(req,res) =>{

    const {id:contactID} = req.params;
    const sql = "SELECT * FROM contact WHERE id=?";
    const params = [contactID];
    db.get(sql, params, (err,row) => {
        if(err){
            console.log(err);
            res.status(400).json({error : err.message });
            return
        }
        res.json({Message : `Afficher le contact ${contactID}`, data: row});

    })

})

// créer un nouveau contact
app.post('/api/contacts', (req,res) =>{
    const {name, email, phone} = req.body;
    if(!name || !phone || !email){

        res.status(400).json({error : "Merci de remplir tous les champs"})
        return 
    }
    const contact = {name , phone ,email};

    const sql  = 'INSERT INTO contact (name, phone, email)  VALUES (?,?,?)';
    const params = [contact.name, contact.phone, contact.email]
    db.run(sql, params, function(err, result)  {
        if(err){
            console.log(err);
            res.status(400).json({error : err.message });
            return
        }
         res.status(201).json({message : "contact créer avec succée",
         data: contact });
        
         
      

    })
 //res.json({message : "ca ne passe pas"})
   

})

//Modifier un contact
app.put('/api/contacts:id', (req,res) =>{
    const {id:contactID} = req.params;
    const {name, email, phone} = req.body;
    if(!name || !phone || !email){

        res.status(400).json({error : "Merci de remplir tous les champs"})
        return 
    }
    const contact = {name , phone ,email};

    const sql  = " UPDATE contact SET name = ?, email = ?, phone = ? WHERE id = ? ";
    const params = [contact.name, contact.phone, contact.email, contactID]
    db.run(sql, params, function(err, result)  {
        if(err){
            console.log(err);
            res.status(400).json({error : err.message });
            return
        }
         res.status(201).json({message : `contact ${contactID} Modifié avec succée`,
         data: contact });
        
         
      

    })
 //res.json({message : "ca ne passe pas"})
   

})
// supprimer un contact

app.delete('/api/contacts:id',(req,res) =>{
    const {id:contactID} = req.params;
    const sql = "DELETE FROM contact WHERE id =?"
    db.run(sql,contactID, (err,resultat)=>{
        if(err){
            console.log(err);
            res.status(400).json({error : err.message });
            return
        }
        res.json({Message : `Contact ${contactID} supprimee`,data: this.changes})

    })
})
// demarer le serveur

app.listen( PORT, function(){
    console.log(`L'application est démarré par le serveur http//:localhost:${PORT}` );
})