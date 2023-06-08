const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const MemoryStore = require("memorystore")(session);

// todo
// dodati rute
const shipmentTracking = require("./routes/tracking.routes");
const login = require("./routes/login.routes");
const productRouter = require("./routes/getAllProducts.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      ttl: 1200000, // vrijeme nakon kojeg ce sesija isteci - 20min
    }),
  })
);

// potrebno je registracija u najjednostavnijem obliku cisto da se implementira razlicitost u postavljanju upita prema bazi podataka
// ako je korisnik smije pretraziti samo svoju narudzbu
// ako je admin onda on smije dobiti podatke o svim trenutnim aktualnim posiljkama koje su u tranzitu
app.use("/shipmentTracking", shipmentTracking);
app.use("/", login);
app.use("/products", productRouter);

app.listen(80);
