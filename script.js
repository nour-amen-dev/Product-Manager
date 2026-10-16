let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productQuantity = document.getElementById("productQuantity");
let saveBtn = document.getElementById("saveBtn");
let message = document.getElementById("message");
let productList = document.getElementById("productList");

let products = [];
let editIndex = null; 

let savedProductsData = localStorage.getItem("products");

if (savedProductsData !== null) {
    products = JSON.parse(savedProductsData);
}

function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
    productList.innerHTML = "";

    products.forEach(function(product, index){
        productList.innerHTML += `
        <div class="product-card">
            <h3>${product.name}</h3>
             <p>Price: ${product.price}</p>
             <p>Quantity: ${product.quantity}</p>
             <button onclick="editProduct(${index})">Edit</button>
             <button onclick="deleteProduct(${index})">Delete</button>
        </div>
        `;
    });
}

saveBtn.addEventListener("click", function() { 
    let product = {
        name: productName.value,
        price: productPrice.value,
        quantity: productQuantity.value
    };
    
    if (editIndex === null) { 
        products.push(product);
        message.textContent = "Product Added Successfully";
    } else {
        products[editIndex] = product; 
        editIndex = null; 
        saveBtn.textContent = "Save Product";
        message.textContent = "Product Updated Successfully";
    }

    saveToLocalStorage(); 
    displayProducts();

    
    productName.value = "";
    productPrice.value = "";
    productQuantity.value = "";
});

function editProduct(index) {
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productQuantity.value = products[index].quantity;

    editIndex = index; 
    saveBtn.textContent = "Update Product";
}

function deleteProduct(index) {
    products.splice(index, 1);

    saveToLocalStorage(); 
    displayProducts();

    message.textContent = "Product Deleted Successfully";
}

displayProducts();