let body = "";

fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        data.products.forEach(element => {
            body += ` <article class="product-card">
                        <img src="${element.thumbnail}" alt="${element.title}" class="product-image">
                        <div class="product-body">
                            <div class="product-meta">
                                <span class="category-badge">${element.category}</span>
                            </div>
                            <h3>${element.title}</h3>
                            <p class="muted">SKU: ${element.id}</p>
                            <div class="product-footer">
                                <div>
                                    <span class="price">$${element.price}</span>
                                    <span class="stock">12 units</span>
                                </div>
                                <div class="action-chips">
                                    <button class="btn btn-sm btn-secondary" onclick='openProductPopup(${JSON.stringify(element)})'>Edit</button>
                                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${element.id})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </article>`;
        });
        document.getElementById("load-products").innerHTML = body;
    })
    .catch(error => console.error('Error fetching products:', error));



function openProductPopup(element) {
    document.getElementById("productPopup").style.display = "flex";

    document.getElementById("item-name").value = element.title;
    document.getElementById("item-category").value = element.category;
    document.getElementById("item-sku").value = element.id;
    document.getElementById("item-price").value = element.price;
    document.getElementById("item-stock").value = 12;
    document.getElementById("item-image-url").value = element.thumbnail;

}

function closeProductPopup() {
    document.getElementById("productPopup").style.display = "none";
}

function deleteProduct(id) {
    fetch(`https://dummyjson.com/products/id`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            console.log("Product deleted:", data);
        })
        .catch(error => console.error('Error deleting product:', error));

    closeProductPopup();
}

function addProduct() {
    const newProduct = {
        title: document.getElementById("item-name").value,
        category: document.getElementById("item-category").value,
        id: document.getElementById("item-sku").value,
        price: parseFloat(document.getElementById("item-price").value),
        stock: parseInt(document.getElementById("item-stock").value),
        thumbnail: document.getElementById("item-image-url").value
    };
    
    if (!newProduct.title || !newProduct.category || !newProduct.id || isNaN(newProduct.price) || isNaN(newProduct.stock) || !newProduct.thumbnail) {
        alert("Please fill in all fields correctly.");
        return;
    }

    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Product added:", data);
            // Optionally, refresh the product list or update the UI
        })
        .catch(error => console.error('Error adding product:', error));

    Swal.fire({
        title: "Item Added Successfully!",
        icon: "success",
        draggable: true
    });
}

function clearForm() {
    
}