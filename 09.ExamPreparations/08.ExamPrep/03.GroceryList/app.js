const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';
// const inputDOMSelectors = {
//     product: document.getElementById('product'),
//     count: document.getElementById('count'),
//     price: document.getElementById('price'),
// }
// const otherDOMSelectors = {
//     addBtn: document.getElementById('add-product'),
//     updateBtn: document.getElementById('update-product'),
//     loadBtn: document.getElementById('load-product'),
//     producsContainer: document.querySelector('.list'),
// }
// let currentProducts = [];
// let productToEdit = {};

// otherDOMSelectors.loadBtn.addEventListener('click', loadAllProductsHandler);

// function loadAllProductsHandler(event){
//     if (event) {
//         event.preventDefault();
//     }

//     otherDOMSelectors.producsContainer.innerHTML = '';
//     fetch(BASE_URL)
//     .then((res) => res.json())
//     .then((allProductsRes) => {
//         currentProducts = Object.values(allProductsRes);
//         for (const {product, count, price, _id} of currentProducts) {
//             const tableRow = createElement('tr', otherDOMSelectors.producsContainer);
//             tableRow.id = _id;
//             createElement('td', tableRow, product, ['name']);
//             createElement('td', tableRow, count, ['count']);
//             createElement('td', tableRow, price, ['product-price']);
//             const buttonsTd = createElement('td', tableRow, null, ['btn']);
//             const updateBtn = createElement('button', buttonsTd, 'Update', ['update']);
//             const deleteBtn = createElement('button', buttonsTd, 'Delete', ['delete']);
//         }
//     })
// }
// function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml){
//     const htmlElement = document.createElement(type);

//     if (content && useInnerHtml) {
//         htmlElement.innerHTML = content;
//     }else{
//         if (content && type !== 'input') {
//             htmlElement.textContent = content;
//         }

//         if (content && type === 'input') {
//             htmlElement.value = content;
//         }
//     }

//     if (classes && classes.length > 0) {
//         htmlElement.classList.add(...classes);
//     }

//     if (id) {
//         htmlElement.id = id;
//     }

//     //{ src: 'link', href: 'http' }
//     if (attributes) {
//         for (const key in attributes) {
//             htmlElement.setAttribute(key, attributes[key])
//         }
//     }

//     if (parentNode) {
//         parentNode.appendChild(htmlElement);
//     }

//     return htmlElement;
// }


const loadBtn = document.querySelector("#load-product");
loadBtn.addEventListener("click", loadProducts);

function loadProducts(e){
    e.preventDefault();
    fetch(BASE_URL)
    .then(res => res.json())
    .then(result => {
        console.log(Object.values(result));
    });
}