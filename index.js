
class Products{
    constructor(products){
       
    }
    async getDataProduct() {
        let DataProducts = await fetch('products.json');
        DataProducts = DataProducts.json();
       return DataProducts;
    }

}
class Ui {
    constructor() {
        
    }
    displayProducts(productItems){
        const elementContainerProducts = document.getElementById('container-products');
        var elementDisplay = '';
        productItems.forEach(item => {
           let contentButton = 'incart';
            if(item.incard === false){
                contentButton = 'add to cart';
            }
            elementDisplay+= `<div class="product">
            <button data-id =${item.dataId} class="button-cart">${contentButton}</button>
            <img src=${item.linkImg} alt="" srcset="">
            <p>${item.title}</p>
            <p>${item.price}</p>
        </div>`
        });
  elementContainerProducts.innerHTML = elementDisplay;
    }
}
let products =new Products();
let ui = new Ui();

products.getDataProduct().then((products)=>{
    console.log(products.items)
    const productItems = products.items.map((product)=>{
        let {title,price} = product.fields;
        let linkImg = product.fields.image.fields.file.url;
        let dataId = product.sys.id;
        let incard = false;
        return {title,price,linkImg,dataId,incard};
    })
    localStorage.setItem('products', JSON.stringify(productItems));
});
let productItems = JSON.parse(localStorage.getItem('products'));
ui.displayProducts(productItems);
carts(productItems);
function carts(productItems){
    
    const elementContainerProducts = document.getElementById('container-products');
    elementContainerProducts.addEventListener('click',(e)=>{
        let productItems = JSON.parse(localStorage.getItem('products'));
       let buttonCart = e.target;
       console.log(buttonCart.dataset.id)
       let productNews = productItems.map((product)=>{
          let idButton = String(buttonCart.dataset.id);
           if(product.dataId === idButton){
             return {...product,incard : true}
           }
          else{
             return product;
           }
           
       })
      
       ui.displayProducts(productNews);
       localStorage.setItem('products',JSON.stringify( productNews));
       var cartItems = productNews.filter((product)=>{
          return product.incard === true;
       })
       localStorage.setItem('carts',JSON.stringify( cartItems));
    })
}
console.log(localStorage.getItem('carts'))