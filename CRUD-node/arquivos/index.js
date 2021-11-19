const { Template } = require("ejs");
const express = require("express");
const app = express();
const pool = require("./bd");

app.set('view engine', 'ejs');

app.use(express.json()); // => req.body

//ROTAS//

//pegar todos afazeres
app.get("/afazeres", async (req, res) => {
    try {
        const allAfazer = await pool.query("SELECT description FROM afazeres");

        res.json(allAfazer.rows);
    } catch (err) {
        console.error(err.message); 
    }

});

//pegar um afazer
app.get("/afazeres/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const afazer = await pool.query("SELECT description FROM afazeres WHERE afazer_id = $1", [id]);

        res.json(afazer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//criar um afazer
app.post("/afazeres", async(req, res) => {
    try{
        const {description} = req.body;
        const newAfazer = await pool.query("INSERT INTO afazer (description) VALUES ($1) RETURNING *", 
        [description]);

        res.json(newAfazer.rows[0]);
    } catch(err){
        console.error(err.message);
    }
});

//atualizar um afazer
app.put("/afazeres/:id", async(req, res) => {
    try {
      const {id} = req.params; //onde
      const {description} = req.body; //o que vai mudar

      const atualizarAfazer = await pool.query("UPDATE afazeres SET description = $1 WHERE afazer_id = $2", [description, id]);

      res.sendFile('/template-atu.html');
    } catch (err) {
        console.error(err.message);
    }
})

//deletar um afazer
app.delete("/afazeres/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deletarAfazer = await pool.query("DELETE FROM afazeres WHERE afazer_id = $1", [id]);
        
        res.render('template-del');
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5432, () => {
    console.log("server is listening on port 5432");
});