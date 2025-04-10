// Required resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const accountValidate = require("../utilities/account-validation")

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build register view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
  "/register",
  accountValidate.registrationRules(),
  accountValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login request
router.post(
  "/login",
  accountValidate.loginRules(),
  accountValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Management view after login
router.get(
  "/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildAccountManagement)
)

router.get("/update/:accountId", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildUpdateView)
)

router.post("/update-account", 
  accountValidate.updateAccountRules(), 
  accountValidate.checkUpdateData, 
  utilities.handleErrors(accountController.updateAccountInfo)
)

router.post("/update-password", 
  accountValidate.passwordRules(), 
  accountValidate.checkPasswordData, 
  utilities.handleErrors(accountController.updatePassword)
)


router.get("/logout", accountController.logout)


module.exports = router
