class Store {
  #cartCount = 0
  #cartProducts = []
  updateCartCount(cartCount) {
    this.#cartCount = cartCount
    this.#saveCartCount()
  }

  #saveCartCount() {
    localStorage.setItem('BDCommerce-cart-count', this.#cartCount)
  }

  #saveProductsData() {
    localStorage.setItem('BDCommerce-cart', JSON.stringify(this.#cartProducts))
  }
  updateCart(products) {
    this.#cartProducts = products
    this.#saveProductsData()
  }

  getProductsData() {
    if (localStorage.getItem('BDCommerce-cart') === null) {
      return this.#cartProducts
    } else {
      this.#cartProducts = JSON.parse(localStorage.getItem('BDCommerce-cart'))
      return this.#cartProducts
    }
  }

  getCartCount() {
    if (localStorage.getItem('BDCommerce-cart-count') === null) {
      return this.#cartCount
    } else {
      this.#cartCount = localStorage.getItem('BDCommerce-cart-count')
      return this.#cartCount
    }
  }



}

const store = new Store()
export { store }