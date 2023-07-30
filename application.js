$(document).ready(function() {
  // Array to store the items in the cart
  let cartItems = [];

  // Function to calculate and update the total price
  function updateTotal() {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    $('#total-price').text('$' + total.toFixed(2));
  }

  // Function to add a new item to the cart
  function addItemToCart(name, price, quantity) {
    const item = {
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    };
    cartItems.push(item);
    displayCart();
    updateTotal();
  }

  // Function to remove an item from the cart
  function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    displayCart();
    updateTotal();
  }

  // Function to display the cart items
  function displayCart() {
    const $itemsDiv = $('#items');
    $itemsDiv.empty();

    cartItems.forEach((item, index) => {
      const subTotal = (item.price * item.quantity).toFixed(2);
      $itemsDiv.append(`
        <div class="item">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$${item.price.toFixed(2)}</span>
          <span class="item-quantity">Quantity: ${item.quantity}</span>
          <span class="item-subtotal">Subtotal: $${subTotal}</span>
          <button class="delete-button" data-index="${index}">Delete</button>
        </div>
      `);
    });

    // Add event listener to delete buttons
    $('.delete-button').on('click', function() {
      const index = $(this).data('index');
      removeItemFromCart(index);
    });
  }

  // Event listener for the Add Item button
  $('#add-button').on('click', function() {
    const itemName = $('#item-name').val();
    const itemPrice = $('#item-price').val();
    const itemQuantity = $('#item-quantity').val();
    
    if (itemName && itemPrice && itemQuantity) {
      addItemToCart(itemName, itemPrice, itemQuantity);
      $('#item-name').val('');
      $('#item-price').val('');
      $('#item-quantity').val('1');

      updateTotal(); // Update total when an item is added
    }
  });
});
