function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

// New Functions
//----------------------------------------------------------------------------------------------------------------------

// Cria os elementos HTML com auxílio das funções nativas
function createProduct(products) {
  products.forEach((product) => {
    const computer = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };

    const element = createProductItemElement(computer);
    const section = document.querySelector('.items');

    section.appendChild(element);
  });
}

// Consulta a API do ML
async function getComputers() {
  const products = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((res) => res.json());

  console.log(products.results);
  createProduct(products.results);
}

// Chamada da função de consulta ao carregar a página
window.onload = function onload() { 
  getComputers(); 
};
