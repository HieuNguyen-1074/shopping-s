const elementContainerProducts = document.getElementById('container-products');
const elementCartProducts = document.getElementById('cart-products');
const elementMouse = document.getElementById('mouse');
window.addEventListener('mousemove',(e)=>{
    elementMouse.style.top = `${e.clientY}px`;
    elementMouse.style.left = `${e.clientX}px`;

})
class Products {
    constructor(products) {

    }
    async getDataProduct() {
        let DataProducts = await fetch('products.json');
        DataProducts = DataProducts.json();
        return DataProducts;
    }

}
class Cart {
    constructor(){
      this.dataCart = localStorage.getItem('carts')
    }


}
class Ui {
    constructor() {

    }
    displayProducts() {
        let productItems = JSON.parse(localStorage.getItem('products'));
        const elementContainerProducts = document.getElementById('container-products');
        var elementDisplay = '';
        productItems.forEach(item => {
            let contentButton = 'incart';
            if (item.incart === false) {
                contentButton = 'add to cart';
            }
            elementDisplay += `<div class="product">
            <button data-id =${item.dataId} class="button-cart">${contentButton}</button>
            <img src=${item.linkImg} alt="" srcset="">
            <p>${item.title}</p>
            <p>$${item.price}</p>
        </div>`
        });
        elementContainerProducts.innerHTML = elementDisplay;
    }
    displayCart(){
      const elementQuantityCartIcon = document.getElementById('cart-icon').getElementsByTagName('sup')[0];
      const elementTotalMoney = document.getElementById('total-money');
      let dataCarts =JSON.parse(localStorage.getItem('carts') ) ;
      let displayCart='';
      let totalMoney = 0;

      if(dataCarts.length === 0){
        displayCart = '<p>nothing in here</p>';
      }
    
    dataCarts.forEach( cart => {
         displayCart += `<div class="cart-products">
         <div class="cart-products-infor">
             <img src=${cart.linkImg} alt="">
             <div class="cart-product-infor">
                 <p>${cart.title}</p>
                 <p>$${cart.price}</p>
                 <a data-id = ${cart.dataId} id="clear-product">clear</a>
             </div>
             <div class="quantity">
                 <i class="fas fa-sort-up" data-id="${cart.dataId}" title ="cart-up"></i>
                 <p>${cart.quantity}</p>
                 <i class="fas fa-caret-down" data-id="${cart.dataId}" title ="cart-down"></i>
             </div>
         </div>
         </div>
` 
     totalMoney+= (cart.price*cart.quantity);
    });
    elementCartProducts.innerHTML = displayCart;
    elementQuantityCartIcon.textContent = dataCarts.length;
    elementTotalMoney.textContent = `$${totalMoney}`;
    ui.displayProducts()
    }
}

let products = new Products();
let ui = new Ui();
let carts = new Cart();

    // set data in localStorage

products.getDataProduct().then((products) => {
    const productItems = products.items.map((product) => {
        let { title, price } = product.fields;
        let linkImg = product.fields.image.fields.file.url;
        let dataId = product.sys.id;
        let incart = false;
        return { title, price, linkImg, dataId, incart };
    })
   
    localStorage.setItem('products', JSON.stringify(productItems));
    localStorage.setItem('carts','[]');

});
 // end set data in localStorage

ui.displayProducts();
ui.displayCart()
// function carts(productItems) {

// event click Add to cart
    elementContainerProducts.addEventListener('click', (e) => {
        let productItems = JSON.parse(localStorage.getItem('products'));
        let buttonCart = e.target;
        let productNews = productItems.map((product) => {
            let idButton = String(buttonCart.dataset.id);
            if (product.dataId === idButton) {
                return { ...product, incart: true,quantity: 1 }
            }
            else {
                return product;
            }

        })
        ui.displayProducts(productNews);
        localStorage.setItem('products', JSON.stringify(productNews));
        var cartItems = productNews.filter((product) => {
            return product.incart === true;
        })
        localStorage.setItem('carts', JSON.stringify(cartItems));
        ui.displayCart();
    })
// }
//EVENT CLICK TO CLOSE CART

const elementIconCloseCart = document.getElementById('close-cart');
const elementIconOpenCart = document.getElementById('cart-icon');
const elementContainerCarts = document.getElementById('cart-container');
const elementCart = document.getElementById('cart');
elementIconOpenCart.addEventListener('click',()=>{
    elementContainerCarts.classList.remove('cart-container-close')
    elementCart.classList.remove('cart-close');
})
elementIconCloseCart.addEventListener('click',()=>{
    elementContainerCarts.classList.add('cart-container-close');
    elementCart.classList.add('cart-close');
})

      const elementButtonClearAllPruducts = document.getElementById('btn-clear-all-cart');
    //   const elementButtonClearProduct = document.querySelectorAll('#clear-product');
    //   elementButtonClearProduct.forEach(element => {
    //         element.addEventListener('click',(e)=> { 
    //             console.log(e.target)
    //          })
    //   });
    elementContainerCarts.addEventListener('click',(e)=>{
        if(e.target.textContent === 'clear'){
            let productItems = JSON.parse(localStorage.getItem('products'));
            let dataCart =  JSON.parse(localStorage.getItem('carts'));
           productItems =  productItems.map((product)=>{
                if(product.incart===true && product.dataId === e.target.dataset.id){
                    return {...product,incart:false}
                }
                else{
                    return {...product};
                }
            })
            dataCart = dataCart.filter((cart)=>{
               return cart.dataId != e.target.dataset.id;

            })
            localStorage.setItem('carts',JSON.stringify(dataCart));
            localStorage.setItem('products',JSON.stringify(productItems));
            ui.displayProducts();
            ui.displayCart();
        }
        
    })
    
     const elementCartIconUp = document.getElementById('cart-quantity-up');
     const elementCartIconDown = document.getElementById('cart-quantity-down');
     elementContainerCarts.addEventListener('click',(e)=>{
         if(e.target.title && e.target.title === 'cart-up'){
             let dataCart = JSON.parse(localStorage.getItem('carts'));
             
             dataCart = dataCart.map((cart)=>{
                 if(cart.dataId === e.target.dataset.id){
                     let quantity = ++cart.quantity;
            
                   return {...cart, quantity:quantity};
                
                 }
                 else{
                     return {...cart};
                 }
             })
             localStorage.setItem('carts',JSON.stringify(dataCart));
             ui.displayCart();
         }
     })
     
     elementContainerCarts.addEventListener('click',(e)=>{
        if(e.target.title && e.target.title === 'cart-down'){
            let dataCart = JSON.parse(localStorage.getItem('carts'));
            
            dataCart = dataCart.map((cart)=>{
                if(cart.dataId === e.target.dataset.id){
                    let quantity = --cart.quantity;
                  return {...cart, quantity:quantity};
               
                }
                else{
                    return {...cart};
                }
            })
            dataCart = dataCart.filter((cart)=>{
                return cart.quantity != 0;
            })
            localStorage.setItem('carts',JSON.stringify(dataCart));
            ui.displayCart();
        }
    })
elementButtonClearAllPruducts.addEventListener('click',()=>{
    localStorage.setItem('carts','[]');
    let productItems =  JSON.parse(localStorage.getItem('products'));
    productItems = productItems.map((product)=>{
        return {...product,incart :false}
    })
    localStorage.setItem('products',JSON.stringify(productItems));
    ui.displayProducts();
    ui.displayCart();
})
elementButtonClearAllPruducts.addEventListener('click',()=>{
    localStorage.setItem('carts','[]');
    let productItems =  JSON.parse(localStorage.getItem('products'));
    productItems = productItems.map((product)=>{
        return {...product,incart :false}
    })
    localStorage.setItem('products',JSON.stringify(productItems));
    ui.displayProducts();
    ui.displayCart();
})
