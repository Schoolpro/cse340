const pool = require("../database")

/* Insertar un nuevo comentario */
async function addComment(account_id, inv_id, comment_text) {
  try {
    const sql = `
      INSERT INTO vehicle_comments (account_id, inv_id, comment_text)
      VALUES ($1, $2, $3)
      RETURNING *;
    `
    const result = await pool.query(sql, [account_id, inv_id, comment_text])
    return result.rows[0]
  } catch (error) {
    console.error("addComment error:", error.message)
    throw error
  }
}

/* Obtener todos los comentarios para un vehículo */
async function getCommentsByVehicleId(inv_id) {
  try {
    const sql = `
      SELECT vc.comment_text, vc.comment_date, a.account_firstname, a.account_lastname
      FROM vehicle_comments AS vc
      JOIN account AS a ON vc.account_id = a.account_id
      WHERE vc.inv_id = $1
      ORDER BY vc.comment_date DESC;
    `
    const result = await pool.query(sql, [inv_id])
    return result.rows
  } catch (error) {
    console.error("getCommentsByVehicleId error:", error.message)
    throw error
  }
}

module.exports = { addComment, getCommentsByVehicleId }
