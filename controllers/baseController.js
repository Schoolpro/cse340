const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
   const nav = await utilities.getNav() //  Forzamos el error comentando esto
    res.render("index", {title: "Home", nav}) //  Esto fallará porque nav no está definido
}

module.exports = baseController
