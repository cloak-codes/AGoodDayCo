// open shopping cart
function handleCart() {
  const cartIcon = document.querySelector(".cart-icon");
  const cart = document.querySelector(".cart");
  const closeBtn = document.querySelector(".close-button");

  cartIcon.addEventListener("click", () => {
    cart.style.right = 0;
  });

  closeBtn.addEventListener("click", () => {
    cart.style.right = "-305px";
  });
}
handleCart();

// add items to cart

const addToCartButtons = document.querySelectorAll(".addtocart-btn");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".items");
    const productPhoto = item.querySelector(".product-photo").innerHTML;
    const productInfo = item.querySelector(".product-info").innerHTML;
    const productPrice = item.querySelector(".product-price").innerHTML;
    const cartItem = `
      <div class="cart-item">
        ${productPhoto}
        ${productInfo}
        <div class="cart-item-price">${productPrice}</div>
        <button class="remove-from-cart-btn">Remove from Cart</button>
      </div>
    `;
    document
      .querySelector(".cart-items")
      .insertAdjacentHTML("beforeend", cartItem);
    removeFromCart();
    updateCartTotal();
  });
});

// remove items from cart
function removeFromCart() {
  const removeItem = document.querySelectorAll(".remove-from-cart-btn");
  for (let i = 0; i < removeItem.length; i++) {
    let button = removeItem[i];
    button.addEventListener("click", function (event) {
      const buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updateCartTotal();
    });
  }
}

// update cart total
function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart-item");
  let total = 0;
  cartItems.forEach((item) => {
    const priceString = item.querySelector(".cart-item-price").innerHTML;
    const price = parseFloat(priceString.replace("$", ""));
    total += price;
  });
  document.querySelector(".cart-total").innerHTML = `${total.toFixed(2)}`;
}

// check out
function checkOutCart() {
  const checkOut = document.querySelector(".checkout-button");
  const items = document.querySelector(".cart-items");
  checkOut.addEventListener("click", function () {
    items.remove();
    updateCartTotal();
    alert("Thank you for shopping with us. Have a great day!");
  });
}
checkOutCart();

// search products
const searchInput = document.querySelector(".search-container input");
const items = document.querySelectorAll(".items");
let timeoutId;
const noResults = document.createElement("h1");
noResults.innerText = "No matching products found. Please search again.";

searchInput.addEventListener("keyup", function (event) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
    const searchValue = event.target.value.toLowerCase();

    items.forEach(function (item) {
      const itemId = item.getAttribute("id").toLowerCase();

      if (itemId.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }, 500);
});
