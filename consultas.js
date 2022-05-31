//Requerimientos

const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "holahola",
    port: 5432,
    // Paso 1
    database: "repertorio_db",
});

//1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y
//realice a través de una función asíncrona la inserción en la tabla repertorio.
const insertar = async (datos) => {
    // Paso 3
    const consulta = {
        text: "INSERT INTO repertorio (artista, cancion, tono) values  ($1, $2, $3)",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        // Paso 4
        console.log(error.code);
        return error;
    }
};

//2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla repertorio.
const consultar = async () => {
    // Paso 2
    try {
        const result = await pool.query("SELECT * FROM repertorio")
        return result.rows
    } catch (error) {
        // Paso 3
        console.log(error.code)
        return error
    }
}

//3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar,
//ejecuta una función asíncrona para hacer la consulta SQL correspondiente y actualice ese registro de la tabla repertorio.
const editar = async (datos) => {
    // Paso 2
    const consulta = {
        text: `UPDATE repertorio SET artista = $2, cancion = $3, tono = $4 WHERE id = $1 RETURNING *`,
        values: datos,
    };
    // Paso 3
    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

//4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
//realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.
// Paso 1
const eliminar = async (id) => {
    // Paso 2
    try {
        const result = await pool.query(
            `DELETE FROM repertorio WHERE id = ${id}`
        );
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};
// Paso 5
module.exports = { insertar, consultar, editar, eliminar };






