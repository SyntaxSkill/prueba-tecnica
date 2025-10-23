// tokenService.js
function generarToken() {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8 dígitos
}

async function guardarToken(db, token) {
  const query = "INSERT INTO tokens (token, estado) VALUES (?, 'activo')";
  await db.execute(query, [token]);
}

async function validarToken(db, token) {
  const [rows] = await db.execute(
    "SELECT * FROM tokens WHERE token = ? AND estado = 'activo'",
    [token]
  );
  return rows.length > 0;
}

module.exports = { generarToken, guardarToken, validarToken };
