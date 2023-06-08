let shipmentsButton = document.querySelector("#shipmentDetails");
let productsButton = document.querySelector("#availableProducts");
let addProductButton = document.querySelector("#newProduct");

shipmentsButton.addEventListener("click", () => {
  shipmentClick();
});

productsButton.addEventListener("click", () => {
  productsClick();
});

addProductButton.addEventListener("click", () => {
  addProductClick();
});

function shipmentClick() {
  window.location.href = "/shipmentTracking/getAllShipments";
}

function productsClick() {
  window.location.href = "/products";
}

function addProductClick() {
  window.location.href = "/products/addProduct";
}
