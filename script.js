// Native Function
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Native Function
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  const valueToRemove = event.target;

  valueToRemove.parentNode.removeChild(valueToRemove);
}

// Native Function
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Native Function
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Developed Function
function sendToCart(product) {
  const productCart = {
    sku: product.id,
    name: product.title,
    salePrice: product.price,
  };

  const element = createCartItemElement(productCart);
  const cart = document.querySelector('.cart__items');
  cart.appendChild(element);
}

// Developed Function
// Consulta a API e retorna informações do produto que foi clicado
async function getProductById(event) {
  const id = getSkuFromProductItem(event.target.parentNode);

  const item = await fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((res) => res.json());

  console.log(item);
  sendToCart(item);
}

// Native Function
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', getProductById);

  return section;
}

// Developed Functions
//----------------------------------------------------------------------------------------------------------------------

// Cria os elementos HTML com auxílio das funções nativas do projeto
function createProduct(products) {
  products.forEach((product) => {
    const productobj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };

    const element = createProductItemElement(productobj);
    const section = document.querySelector('.items');

    section.appendChild(element);
  });
}

// Consulta a API do ML
async function getProducts() {
  const products = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((res) => res.json());

  console.log(products.results);
  createProduct(products.results);
}

// Chamada da função de consulta ao carregar a página
window.onload = function onload() { 
  getProducts(); 
};
