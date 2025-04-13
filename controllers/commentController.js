const commentModel = require("../models/comment-model")
const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")

const commentController = {}

/* ******************************
 * Mostrar los detalles del vehículo con comentarios
 * ******************************/
commentController.buildVehicleDetail = async function (req, res, next) {
  const inv_id = req.params.inv_id
  let nav = await utilities.getNav()

  try {
    const vehicle = await inventoryModel.getInventoryById(inv_id)
    const comments = await commentModel.getCommentsByVehicleId(inv_id)

    res.render("inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicle,
      comments,
      errors: null
    })
  } catch (error) {
    next(error)
  }
}

/* ******************************
 * Procesar nuevo comentario
 * ******************************/
commentController.addComment = async function (req, res, next) {
  const { inv_id, comment_text } = req.body
  const account_id = res.locals.accountData.account_id
  let nav = await utilities.getNav()

  try {
    await commentModel.addComment(account_id, inv_id, comment_text)
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    req.flash("notice", "Error saving your comment.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

module.exports = commentController
