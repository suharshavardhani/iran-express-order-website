// Function to display the menu
const displayMenu = () => {
  const menuContainer = document.getElementById("menu-items");
  menuContainer.innerHTML = ""; // Clear menu container

  menu.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
      <div class="menu-details">
        <h3>${item.name}</h3>
        <p>Category: ${item.category}</p>
        <p>Price: ${item.price}/-</p>
      </div>
      <div class="menu-image">
        <img src="${item.img}" alt="${item.name}" />
        <div class="quantity-selector">
          <button class="quantity-btn" onclick="increaseQuantity(${item.id})">Add</button>
          <input type="text" id="quantity-${item.id}" value="0" readonly />
          <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">Remove</button>
        </div>
      </div>
    `;
    menuContainer.appendChild(menuItem);
  });
};


// Cart structure with quantities
let cart = [];

// Function to increase quantity of an item
const increaseQuantity = (id) => {
  const item = menu.find(menuItem => menuItem.id === id);
  const input = document.getElementById(`quantity-${id}`);
  let currentQuantity = parseInt(input.value);

  // Update the quantity in the input field
  input.value = ++currentQuantity;

  // Add item to cart or update quantity in cart
  const cartItem = cart.find(cartItem => cartItem.id === id);
  if (cartItem) {
    cartItem.quantity = currentQuantity;
  } else {
    cart.push({ ...item, quantity: currentQuantity });
  }

  // Update the cart display
  displayCart();
};

// Function to decrease quantity of an item
const decreaseQuantity = (id) => {
  const input = document.getElementById(`quantity-${id}`);
  let currentQuantity = parseInt(input.value);

  if (currentQuantity > 0) {
    input.value = --currentQuantity;

    // Update cart quantity or remove if zero
    const cartItem = cart.find(cartItem => cartItem.id === id);
    if (cartItem) {
      cartItem.quantity = currentQuantity;
      if (cartItem.quantity === 0) {
        cart = cart.filter(item => item.id !== id); // Remove item from cart if quantity is 0
      }
    }

    // Update the cart display
    displayCart();
  }
};

// Function to display cart
const displayCart = () => {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${item.name} - ${item.price} x ${item.quantity}</p>
    `;
    orderSummary.appendChild(cartItem);
  });

  // Show total price
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
  orderSummary.appendChild(totalDiv);
};

// Add UPI payment process (as before)
const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", () => {
  // Calculate total amount
  let totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const upiId = "7395996409@yybl"; // Replace with your actual UPI ID
  const name = "Your Restaurant";
  const transactionId = "T123456";
  const note = "Order Payment";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&tid=${transactionId}&tn=${note}&am=${totalAmount}&cu=INR`;

  // Log the URL to the console to check if it's correct
  console.log("Generated UPI Link: ", upiUrl);

  // Redirect to UPI app
  window.location.href = upiUrl;
});

// Call the displayMenu function when the page loads
window.onload = () => {
  displayMenu();
};
