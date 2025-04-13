const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 * Add new classification
 * ************************** */
async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    console.error("addClassification error:", error.message)
    return null
  }
}

async function addInventory(
  classification_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color
) {
  try {
    const sql = `
      INSERT INTO inventory (
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `

    const result = await pool.query(sql, [
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    ])

    return result.rows[0]
  } catch (error) {
    console.error("addInventory error:", error.message)
    return null
  }
}

/* ***************************
 * Get Inventory Item by ID
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1"
    const result = await pool.query(sql, [inv_id])
    return result.rows[0]
  } catch (error) {
    throw new Error("Database error: " + error)
  }
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql = `
      UPDATE public.inventory 
      SET 
        inv_make = $1, 
        inv_model = $2, 
        inv_description = $3, 
        inv_image = $4, 
        inv_thumbnail = $5, 
        inv_price = $6, 
        inv_year = $7, 
        inv_miles = $8, 
        inv_color = $9, 
        classification_id = $10 
      WHERE inv_id = $11 
      RETURNING *
    `
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("updateInventory error:", error.message)
    return null
  }
}

/* ***************************
 *  Delete Inventory Item
 * ************************** */
async function deleteInventoryItem(inv_id) {
  try {
    const sql = 'DELETE FROM inventory WHERE inv_id = $1'
    const data = await pool.query(sql, [inv_id])
    return data
  } catch (error) {
    console.error("deleteInventoryItem error:", error.message)
    return null
  }
}




/* ***************************
 * Insertar comentario para un vehículo
 * ************************** */
async function addComment(account_id, inv_id, comment_text) {
  try {
    const sql = `
      INSERT INTO vehicle_comments (inv_id, account_id, comment_text)
      VALUES ($1, $2, $3)
      RETURNING *;
    `
    const result = await pool.query(sql, [inv_id, account_id, comment_text])
    return result.rows[0]
  } catch (error) {
    console.error("addComment error:", error.message)
    throw error
  }
}



/* ***************************
 * Obtener comentarios por inv_id
 * ************************** */
async function getCommentsByInvId(inv_id) {
  try {
    const sql = `
      SELECT c.comment_id, c.comment_text, c.created_at,
             a.account_firstname, a.account_lastname
      FROM vehicle_comments AS c
      JOIN account AS a ON c.account_id = a.account_id
      WHERE c.inv_id = $1
      ORDER BY c.created_at ASC;

    `
    const result = await pool.query(sql, [inv_id])
    return result.rows
  } catch (error) {
    console.error("getCommentsByInvId error:", error.message)
    return []
  }
}



module.exports = {
  getClassifications, 
  getInventoryByClassificationId, 
  addClassification,
  addInventory,
  getInventoryById,
  updateInventory,
  deleteInventoryItem,
  addComment,
  getCommentsByInvId,
}
