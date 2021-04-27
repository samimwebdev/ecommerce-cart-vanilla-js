import { product } from './Product';
import { cart } from './Cart';
import { store } from './Store'

class UI {
  loadSelectors() {
    const productsElm = document.querySelector('.products')
    return {
      productsElm
    }
  }
  print(products) {
    const { productsElm } = this.loadSelectors()

    products.forEach(product => {
      const { id, name, price, description, image_url } = product

      const elm = `<div class="col-md-4 col-6">
        <div class="card">
          <img src="${image_url}"
            class="card-img-top product-image" alt="">
          <div class="card-body">
            <h5 class="card-title product-name">${name}</h5>
            <p class='product-description'>${description}</p>
            </p>
            <p class="card-title product-price">${price}</p>
            <p class='product-id'>${id}</p>
            <a href="#" class="btn btn-primary add-to-cart">Add to Cart</a>
          </div>
        </div>
      </div>`
      productsElm.insertAdjacentHTML('afterBegin', elm)
    })


  }
  addToCart(e) {
    //Identify product
    const id = e.target.previousElementSibling.textContent
    //get the product from data source
    const foundProduct = product.data.find(el => el.id === id)
    //Adding to the cart
    cart.add(foundProduct)
    //adding to localStorage
    store.add(foundProduct)
    //update cart
    //update view   
  }
  async init() {
    const { productsElm } = this.loadSelectors()
    //Get Dynamic data from API source
    const products = await product.getProducts()
    this.print(products)
    //Add to cart Event Listener
    productsElm.addEventListener('click', e => {
      if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault()
        this.addToCart(e)
      }
    })

    //cart Button Click
    //LocalStorage related data access

  }
}



const ui = new UI()
export { ui }