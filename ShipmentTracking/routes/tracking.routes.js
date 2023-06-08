const express = require("express");
const router = express.Router();
const dataBase = require("../databse/dataBase");

router.get("/", (req, res, next) => {
  if (req.session.username === "admin") {
    res.render("shipmentTrackingAdmin");
  } else {
    res.render("shipmentTrackingUser");
  }
});

router.post("/", (req, res, next) => {
  let shipmentID = req.body.TrackingID;
  res.redirect("/shipmentTracking/" + shipmentID);
});

// samo za admina
router.get("/getAllShipments", async (req, res, next) => {
  if (req.session.username === "user") {
    // user nema ta prava mora se prijaviti kao admin
    req.session.error =
      "As a user you dont have those premission. Login as admin";
    res.redirect("/login");
  } else {
    try {
      console.log("usao");
      const shipments = await dataBase.query(
        "select id, productname, price ,state, shipmentdate, deliverydate from delivery natural join products"
      );
      res.render("getAllShipments", {
        title: "Shipment info",
        shipments: shipments,
      });
    } catch (error) {
      // Ukoliko dođe do greske pri izvrsavanju upita
      res.status(500).json({ error: "DataBase error" });
    }
  }
});

router.get("/:id", async (req, res, next) => {
  let trackingID = req.params.id;
  try {
    const IDs = await dataBase.query("select id from delivery");
    let test = 0;
    for (let i = 0; i < IDs.length; i++) {
      if (IDs[i].id === parseInt(trackingID)) {
        test = 1;
      }
    }

    if (test === 1) {
      const order = await dataBase.query(
        `select id, productid, productname, state, shipmentdate, deliverydate from delivery natural join products where id = ${trackingID}`
      );

      res.render("orderDetails", {
        title: "Order",
        order: order[0],
      });
    } else {
      res.json("Wrong tracking ID");
    }
  } catch (error) {
    // Ukoliko dođe do greske pri izvrsavanju upita
    res.status(500).json({ error: "DataBase error" });
  }
});

module.exports = router;
