const express = require("express");
const router = express.Router();
const dataBase = require("../databse/dataBase");
const parser = require("body-parser");

// pregled svih dostupnih proizvoda
// select * from products
router.get("/", async (req, res, next) => {
  try {
    const products = await dataBase.query("select * from products");
    // console.log(shipments);
    res.render("allProducts", {
      title: "Products",
      products: products,
    });
  } catch (error) {
    // Ukoliko dođe do greske pri izvrsavanju upita
    res.status(500).json({ error: "DataBase error" });
  }
});

// samo za admina
// ovdje prikazujemo formu za unos proizvoda
router.get("/addProduct", (req, res, next) => {
  if (req.session.username === "user") {
    // user nema ta prava mora se prijaviti kao admin
    req.session.error =
      "As a user you dont have those premission. Login as admin";
    res.redirect("/login");
  } else {
    res.render("addProduct", {
      title: "Add product",
    });
  }
});

// ovdje primamo uneseni product tj POST zahtjev i redirectamo ovisno u njegovim specs
router.post("/addProduct", (req, res, next) => {
  if (req.session.username === "user") {
    // user nema ta prava mora se prijaviti kao admin
    req.session.error =
      "As a user you dont have those premission. Login as admin";
    res.redirect("/login");
  } else {
    const productName = req.body.productName;
    const brand = req.body.brand;
    const model = req.body.model;
    const price = req.body.price;
    res.redirect(
      `/products/addProduct/${productName}-${brand}-${model}-${price}`
    );
  }
});

// ovdje se konacno proizvod unosi u bazu i trajno ostaje pohranjen
router.get("/addProduct/:id", (req, res, next) => {
  if (req.session.username === "user") {
    // user nema ta prava mora se prijaviti kao admin
    req.session.error =
      "As a user you dont have those premission. Login as admin";
    res.redirect("/login");
  } else {
    const productDetails = req.params.id;
    const [productName, brand, model, price] = productDetails.split("-");
    let priceNumeric = parseFloat(price);
    try {
      dataBase.query(
        `insert into products (id, productname, brand, model, price)
   select (select max(id) + 1 from products), $1, $2, $3, $4`,
        [productName, brand, model, priceNumeric]
      );

      res.redirect("/shipmentTracking");
    } catch (error) {
      res.status(500).json({ error: "DataBase error" });
    }
  }
});

// samo admin ima ove ovlasti
router.post("/delete", (req, res, next) => {
  if (req.session.username === "user") {
    // user nema ta prava mora se prijaviti kao admin
    req.session.error =
      "As a user you dont have those premission. Login as admin";
    res.redirect("/login");
  } else {
    let toBeDeleted = req.body.productID;
    try {
      dataBase.query(`delete from products where id = ${toBeDeleted}`);
      res.redirect("/shipmentTracking");
    } catch (error) {
      res.status(500).json({ error: "DataBase error" });
    }
  }
});

module.exports = router;
