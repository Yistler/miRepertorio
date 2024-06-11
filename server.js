const express = require ("express");
const { insertar, consultar, editar, eliminar } = require('./consulta');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
const protocol = process.env.PROTOCOL || "http"; 

app.listen(port, () => {
    console.info(`Servidor disponible en ${protocol}://${host}:${port}`)
});

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/cancion", async(req, res) => {
    try{
        const dato = Object.values(req.body);
        const respuesta = await insertar(dato);
        res.json(respuesta);
    }catch(error){
        console.error("error", error);  
        res.status(500).send("Algo salio mal",error);
    }

});

app.get("/canciones", async(req, res)=>{
    try{
        const respuesta = await consultar();
        res.json(respuesta);
    }catch(err){
        console.error("error", error);  
        res.status(500).send("Algo salio mal",error); 
    }
});
app.put("/cancion/:id", async(req, res)=>{
    try{
        const dato = [req.params.id, ...Object.values(req.body)];
        console.log(dato);
        const result = await editar(dato);
        console.log(result);
        res.json(result)
    }catch(err){
        console.error("error", err);  
        res.status(500).send("Algo salio mal",err); 
    }
});
app.delete("/cancion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await eliminar(id);
        res.json(respuesta);
    } catch (error) {
        console.error("Error encontrado: ", error);
        res.status(500).send("Algo salio mal :(")
    }
});