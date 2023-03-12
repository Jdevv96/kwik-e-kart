function createArticle(product) {
    const article = document.createElement('article');
    article.classList.add('product-card');

    const html = `
        <div class="sku">${product.productSku}</div>
        <div class="price">$${product.price}</div>
        <div class="product-name action" data-id="${product.productId}" title="Click to view more information">${product.name}</div>
        <div class="product-image">
            <img src="${product.imageName}">
        </div>
        <div class="cart">
            <i class="fa-solid fa-cart-arrow-down icon action" title="Add item to cart"></i>
        </div>
         
    `
    article.innerHTML = html;
    return article;
}

function displayProductInfoOnClick(ev) {
    const id = Number(ev.currentTarget.getAttribute("data-id"));
    const allProducts = productService.allProducts;
    allProducts.forEach( (eachProduct) => {
        if(eachProduct.productId === id){
            window.alert("Description: " + eachProduct.description);
        }
    });
}

function addToCartOnClick() {
    const desktopConfirmation = document.getElementById('status');
    desktopConfirmation.innerText = 'Item added to cart!';
    setTimeout( () => {
        desktopConfirmation.innerText = '';
      }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    productService.allProducts.forEach( (product) => {
        const dynamicCard = createArticle(product);
        const section = document.getElementById('product-cards');
        section.appendChild(dynamicCard);
    })

    const names = document.querySelectorAll('.product-name');
    names.forEach( (element) => {
        element.addEventListener('click', displayProductInfoOnClick);
    })

    const elements = document.querySelectorAll('.cart');
    elements.forEach( (i) => {
        i.addEventListener('click', addToCartOnClick);
    });
 
    const searchBar = document.getElementById('search');
    searchBar.addEventListener('keyup', () => {
        const searchText = searchBar.value;
        const filteredProductIds = 
        searchText ? productService.searchProducts(searchText) : productService.getProducts().map((product) => product.productId);
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card) => {
            if (filteredProductIds.includes(Number(card.querySelector('.product-name').getAttribute('data-id')))) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
})