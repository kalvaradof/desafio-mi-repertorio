const http = require("http");
// Paso 1
const { insertar, consultar, editar, eliminar } =
    require("./consultas");
const url = require("url");
// Paso 2
const fs = require("fs");
http
    .createServer(async (req, res) => {
        if (req.url == "/" && req.method === "GET") {
            // Paso 3
            res.setHeader("content-type", "text/html");
            // Paso 4
            const html = fs.readFileSync("index.html", "utf8");
            res.end(html);
        }
        if ((req.url == "/cancion" && req.method == "POST")) { //requerimiento n°1
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                // Paso 2
                const datosJson = JSON.parse(body)
                const datos = [
                    datosJson.artista, // se solicitan json segun el orden de los parametros
                    datosJson.cancion,
                    datosJson.tono
                ]
                // Paso 3
                const respuesta = await insertar(datos);
                // Paso 4
                res.end(JSON.stringify(respuesta));
            });
        }
        if (req.url == "/canciones" && req.method === "GET") { //requerimiento n° 2
            const registros = await consultar();
            res.end(JSON.stringify(registros));
        }
        if (req.url == "/cancion" && req.method == "PUT") { //requerimiento n°3
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                const datosJson = JSON.parse(body)
                const datos = [
                    datosJson.id, //SIRVE PARA QUE CUANDO SE REALICE LA CONSULTA ESTE DEFINIDO EL ORDEN DE COMO SE ENTREGAN LOS PARAMETROS
                    datosJson.artista,
                    datosJson.cancion,
                    datosJson.tono
                ]
                // Paso 2
                const respuesta = await editar(datos);
                res.end(JSON.stringify(respuesta));
            });
        }
        // Paso 2
        if (req.url.startsWith("/cancion?") && req.method == "DELETE") { //requerimiento n° 4
            // Paso 3
            const { id } = url.parse(req.url, true).query;
            // Paso 4
            const respuesta = await eliminar(id);
            res.end(JSON.stringify(respuesta));
        }
    })
    .listen(3000, () => console.log('servidor funcionando correctamente'));