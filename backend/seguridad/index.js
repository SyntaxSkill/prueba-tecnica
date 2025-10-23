const fastify = require("fastify")({ logger: true });
const mysql = require("mysql2/promise");
const { generarToken, guardarToken, validarToken } = require("./tokenService");

// Conexión MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "12345",
  database: "formulario"
};

fastify.get("/ping", async () => {
  return { message: "Microservicio Seguridad funcionando ✅" };
});

// ✅ POST /token (genera token)
fastify.post("/token", async () => {
  const token = generarToken();
  await guardarToken(global.db, token);
  return { token };
});

// ✅ POST /token/validate (valida token)
fastify.post("/token/validate", async (request, reply) => {
  const { token } = request.body;

  if (!token) {
    return reply.code(400).send({ valid: false, message: "Token requerido" });
  }

  const esValido = await validarToken(global.db, token);
  return { valid: esValido };
});

const start = async () => {
  try {
    global.db = await mysql.createConnection(dbConfig);
    console.log("✅ Conectado a MySQL");
    await fastify.listen({ port: 3001 });
    console.log("🚀 Seguridad corriendo en http://localhost:3001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

