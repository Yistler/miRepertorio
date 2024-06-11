const { Pool } = require('pg');
const hostDB = process.env.HOSTDB || '127.0.0.1';
const portDB = process.env.PORTDB || 5432;
const userDB = process.env.USERDB || 'postgres';
const passDB = process.env.PASSDB || '1234';
const database = process.env.DATABASE || 'repertorio'; 

const pool = new Pool({
    user: userDB,
    host: hostDB,
    password: passDB,
    port: portDB,
    database: database,
});

const insertar = async(dato)=>{
    try{
        const consulta = {
            text: "INSERT INTO canciones(titulo, artista, tono) VALUES($1, $2, $3)",
            values: dato
        }
        result = await pool.query(consulta);
        return result;
    }catch(error){
        console.error("error de consulta", error);
    }
};
const consultar = async()=>{
    try{
        const consulta = {
            text: "SELECT * FROM canciones"
        }
        result = await pool.query(consulta);
        return result;
    }catch(err){
        console.error("error de consulta", error);
    }
}
const editar = async(dato)=>{
    try{
        const consulta = {
            text: "UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1",
            values: dato
        }
        const result = await pool.query(consulta);
        return result;
    }catch(err){
        console.error("error de consulta", error);
    }
}
const eliminar = async(id)=>{
    try {
        const consulta = {
            text: "DELETE FROM canciones WHERE id = $1",
            values: [id],
        };
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console.error("Error de consulta", error);
        throw error;
    }
}
module.exports = { insertar, consultar, editar, eliminar };