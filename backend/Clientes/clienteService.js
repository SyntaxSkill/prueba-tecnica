async function registrarCliente(db, data) {
  const query = `
    INSERT INTO registro_cliente (nombre, apellidos, celular, correo)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    data.nombre,
    data.apellidos,
    data.celular,
    data.correo
  ]);

  return { id_cliente: result.insertId, ...data };
}

module.exports = { registrarCliente };
