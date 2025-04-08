// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")  // <-- Esta línea es esencial


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// Management view
router.get(
    "/",
    utilities.handleErrors(invController.buildManagement)
  )
  

  const invValidate = require('../utilities/account-validation') // O inventory-validation si lo separás

// Vista formulario
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

// Procesar datos
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassData,
  utilities.handleErrors(invController.addClassification)

)


// Mostrar el formulario para agregar un nuevo vehículo
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

// Procesar los datos del formulario
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInvData,
  utilities.handleErrors(invController.addInventory)
)



module.exports = router;