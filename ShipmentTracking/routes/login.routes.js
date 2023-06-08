const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/login");
});

router.get("/login", (req, res, next) => {
  res.render("login", {
    err: req.session.error,
  });
});

router.post("/loginAuthentication", (req, res, next) => {
  // cisto razliciti usernameovi za mogucnosti biranja shiping tracka
  // korisnik moze samo svoje narudzbe pogledat dok admin moze pogledat sve narudzbe koje postoje
  const username = req.body.username;
  req.session.username = username;
  if (username !== "admin" && username !== "user") {
    req.session.error = "Wrong username (admin or user?)";
    res.redirect("/login");
  } else {
    delete req.session.error;
    res.redirect("/shipmentTracking");
  }
});

module.exports = router;
