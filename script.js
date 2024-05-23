// CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
})

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
})

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start);
}else{
    start();
}

// START // 
function start(){
    addEvents();
}

// UPDATE AND RENDER //
function update(){
    addEvents();
    updateTotal();
}

// ADD EVENTS //

function addEvents() {
    //Remove items from cart 
    let cartRemove_btn = document.querySelectorAll(".product-remove");
    console.log(cartRemove_btn);
    cartRemove_btn.forEach((btn) => {
        btn.addEventListener("click", handle_removeProductItem);
    });

    //Update item quantity
    let cartQuantity_input = document.querySelectorAll(".cart-quantity");
    cartQuantity_input.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // Add item to cart
    let addCart_btn = document.querySelectorAll(".add-cart");
    addCart_btn.forEach(btn =>{
        btn.addEventListener("click", handle_addCartItem);
    });

    // Check Out Products
    const buy_btn = document.querySelector(".buy-btn")
    buy_btn.addEventListener("click", handle_purchaseOrder)
}

// EVENT FUNCTIONS //
let itemsAdded = []

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-name").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // Existing Item
    if(itemsAdded.find(el => el.title == newToAdd.title)){
        alert("This Product is Aleady in Your Cart >.<");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    // Add products to cart 
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_removeProductItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML);

    update();
}

function handle_changeItemQuantity() {
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
}

function handle_purchaseOrder() {
    if(itemsAdded.length <= 0){
        alert("There are No Orders to Purchase >.< \nPlease Add Products in Your Cart First ^.^");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Order Placed Successfully ^.^ \nGet Ready to Look Amazing!");
    itemsAdded = [];

    update();
}

// UPDATE FUNCTIONS // 
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    })

    // 2 Decimal Points
    total = total.toFixed(2);

    totalElement.innerHTML = "$" + total;
}

// HTML Components //
function CartBoxComponent(title, price, imgSrc){
    return`
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash product-remove'></i>   
    </div>`;

}

const sendMessageButton = document.querySelector('.msg-btn');

sendMessageButton.addEventListener('click', function(event) {
  const nameInput = document.querySelector('input[type="text"]');

  // Check if the name input has any text
  if (nameInput.value.trim() === "") {
    alert('Please complete filling out the fields >.<');
    event.preventDefault(); // Prevent form submission if no name entered
  } else {
    alert('Your Feedback has been submitted! Feel free to explore our website while you wait ^.^');
  }
});       