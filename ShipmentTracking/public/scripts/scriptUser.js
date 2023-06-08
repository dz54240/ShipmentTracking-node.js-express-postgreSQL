let productsButton = document.querySelector("#availableProducts");
productsButton.addEventListener("click", () => {
  productsClick();
});

function productsClick() {
  window.location.href = "/products";
}
