const fastify = require("fastify")({ logger: true });
const mysql = require("mysql2/promise");
const axios = require("axios");
const { registrarCliente } = require("./clienteService");


//  DB
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "12345",
  database: "formulario"
};

// URL microservicio Seguridad
const SEGURIDAD_URL = "http://localhost:3001";

// ✅ Endpoint de prueba
fastify.get("/ping", async () => {
  return { message: "Microservicio Clientes funcionando ✅" };
});

// ✅ Endpoint POST /clientes
fastify.post("/clientes", async (request, reply) => {
  const { nombre, apellidos, celular, correo, token } = request.body;

  // 1. Validar datos
  if (!nombre || !apellidos || !celular || !correo || !token) {
    return reply.code(400).send({ message: "Faltan datos" });
  }

  // 2. Validar token con el microservicio Seguridad
  try {
    const response = await axios.post(`${SEGURIDAD_URL}/token/validate`, { token });
    if (!response.data.valid) {
      return reply.code(401).send({ message: "Token inválido" });
    }
  } catch (error) {
    return reply.code(500).send({ message: "Error validando token" });
  }

  // 3. Registrar cliente en la BD
  try {
    const cliente = await registrarCliente(global.db, { nombre, apellidos, celular, correo });
    return reply.code(201).send({ message: "Cliente registrado", cliente });
  } catch (error) {
    return reply.code(500).send({ message: "Error guardando cliente" });
  }
});

// 🚀 Inicializar servidor
const start = async () => {
  try {
    global.db = await mysql.createConnection(dbConfig);
    console.log("✅ Conectado a MySQL (Clientes)");
    await fastify.listen({ port: 3002 });
    console.log("🚀 Clientes corriendo en http://localhost:3002");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();


