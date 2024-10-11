const displayMenu = () => {
  const menuContainer = document.getElementById("menu-items");
  
  menu.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
      <h3>${item.name}</h3>
      <p>Category: ${item.category}</p>
      <p>Price: $${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuContainer.appendChild(menuItem);
  });
};

// Call the displayMenu function when the page loads
window.onload = () => {
  displayMenu();
};


let cart = [];

// Function to add items to the cart
const addToCart = (id) => {
  const item = menu.find(menuItem => menuItem.id === id);
  cart.push(item);
  displayCart();
};

// Function to display cart
const displayCart = () => {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = "";

  let total = 0;
  
  cart.forEach(item => {
    total += item.price;
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price}</p>
    `;
    orderSummary.appendChild(cartItem);
  });

  // Show total price
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
  orderSummary.appendChild(totalDiv);
};


const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", () => {
  // Get the total amount from your cart
  let totalAmount = 100; // You can replace this with the actual cart total

  // UPI Payment Deep Link
  const upiId = "7395996409@ybl"; // Replace with your actual UPI ID
  const name = "Your Restaurant";
  const transactionId = "T123456";
  const note = "Order Payment";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&tid=${transactionId}&tn=${note}&am=${totalAmount}&cu=INR`;

  // Log the URL to the console to check if it's correct
  console.log("Generated UPI Link: ", upiUrl);

  // Redirect to UPI app
  window.location.href = upiUrl;
});