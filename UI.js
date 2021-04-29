import { product } from './Product';
import { cart } from './Cart';

class UI {
  loadSelectors() {
    const productsElm = document.querySelector('.products')
    const cartCountElm = document.querySelector('.cart-count')
    const cartBtnElm = document.querySelector('.cart-btn')
    const cartBody = document.querySelector('.cart-body');
    const cartModal = document.querySelector('#cartModal');
    return {
      productsElm,
      cartCountElm,
      cartBtnElm,
      cartBody,
      cartModal
    }
  }
  populateCartFromLocalStorage() {
    const cartProducts = cart.getDataFromStorage()
    //update cart count
    this.updateCartCount()
    //update view
    this.updateCartProducts()

  }
  print(categories) {
    const { productsElm } = this.loadSelectors()
    let elm = '';

    categories.forEach(category => {
      elm = `
      <h2> ${category.name.toUpperCase()}</h2>
      <hr />
      <div class='row mb-5'>
      `
      category.products.length > 0 && category.products.forEach(product => {
        const { id, name, price, description, image_url } = product
        elm += `
        <div class="col-md-4 col-6">
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
        </div>
      `})
      elm += '</div>'
      productsElm.insertAdjacentHTML('beforeend', elm)
    })
  }
  getId(e) {
    return e.target.previousElementSibling.textContent
  }

  addToCart(e) {
    //Identify product
    const id = this.getId(e)
    //get the product from data source
    const foundProduct = product.findProduct(id)
    //Adding to the cart
    cart.add(foundProduct)
    //update cart
    this.updateCartCount()
    //update view  
    this.updateCartProducts()
  }
  updateCartProducts() {
    const { cartBody } = this.loadSelectors()
    console.log(cart.data)
    const elm = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">price</th>
          <th scope="col">count</th>
          <th scope="col">delete</th>
        </tr>
      </thead>
      <tbody>
        ${cart.data.length > 0 ? cart.data.map(cartProduct =>
      `<tr>
          <th scope="row"> <img class="modal-product-image" src="${cartProduct.image_url}" alt="${cartProduct.description}"/> </th>
          <td><span class="cart-product-id">${cartProduct.id}</span> ${cartProduct.name}</td>
          <td>${cartProduct.price}</td>
          <td> <i class="fas fa-minus cart-count-decrement"></i> <input type="number" class="cart-input form-control" value="${cartProduct.count}"/>  <i class="fas fa-plus cart-count-increment"></i></td>
          <td><button class="btn btn-danger delete-cart-product">Delete</button></td>
        </tr>`
    ) : `<tr>
     <td colspan="5" class="text-center">No product in the cart</td> 
    </tr>`}
      </tbody>
    </table>
    `

    // cartBody.insertAdjacentHTML('afterBegin', elm)
    cartBody.innerHTML = elm

  }

  updateCartCount() {
    const { cartCountElm } = this.loadSelectors()
    cartCountElm.textContent = cart.cartCount
    //update cart count in localStorage
  }
  incrementCartCount(id) {
    const foundProduct = product.findProduct(id)
    cart.incrementCount(foundProduct)
    this.updateCartCount()
  }
  decrementCartCount(id) {
    const foundProduct = product.findProduct(id)
    cart.decrementCount(foundProduct)
    this.updateCartCount()
  }
  getCartProductId(e) {
    return e.target.parentElement.parentElement.children[1].children[0].textContent
  }
  incrementModalCartCount(e) {
    ++e.target.previousElementSibling.value
  }
  decrementModalCartCount(e) {
    if (parseInt(e.target.nextElementSibling.value) > 0) {
      --e.target.nextElementSibling.value
    }
    return parseInt(e.target.nextElementSibling.value)

  }
  hideModal() {
    const { cartModal } = this.loadSelectors()
    //Why Regular Javascript not working here
    if (cartModal.classList.contains('show')) {
      cartModal.click();
    }
  }
  removeProduct(id, e) {
    //get product by id
    const foundProduct = product.findProduct(id)
    //removed form cart
    cart.remove(foundProduct)
    //Removed from modal view
    e.target.closest('tr').remove()
  }

  async init() {
    const { productsElm, cartBtnElm, cartBody } = this.loadSelectors()
    //Get Dynamic data from API source
    const categories = await product.getProductsWithCategories()
    //show Products in UI
    this.print(categories)
    //Add to cart Event Listener
    productsElm.addEventListener('click', e => {
      if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault()
        this.addToCart(e)
      }
    })

    //cart Button Click
    cartBtnElm.addEventListener("click", (e) => {
      this.updateCartProducts()
    })
    //increment and decrement cart count
    cartBody.addEventListener("click", e => {
      if (e.target.classList.contains('cart-count-increment')) {
        //find the product id
        const id = this.getCartProductId(e)
        this.incrementCartCount(id)
        this.incrementModalCartCount(e)
      }

      if (e.target.classList.contains('cart-count-decrement')) {
        //find the product id
        const id = this.getCartProductId(e)
        this.decrementCartCount(id)
        const productCount = this.decrementModalCartCount(e)
        if (productCount === 0) {
          this.removeProduct(id, e)
        }
      }

      if (e.target.classList.contains('delete-cart-product')) {
        //find the product id
        const id = this.getCartProductId(e)
        this.removeProduct(id, e)
        //update to the UI
        this.updateCartCount()
      }
    })


  }
}



const ui = new UI()
export { ui }