const sqlite3 = require("sqlite3").verbose();

const dbFile = "db.sqlite";

// connexion à la base de donnee

let db  = new sqlite3.Database(dbFile, (err) =>{
    if(err){
        console.error(err);
        throw err
    }else{
        console.log("Connexion à la base sqlite3")
        const sql = `CREATE TABLE contact(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            phone text,
            email text

        )`
        db.run(sql,(err) =>{
            if(err){
                console.log("Table déja crée")
            }
        })
    }
  
  
})


module.exports = db;
