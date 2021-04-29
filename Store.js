const _saveProductsData = Symbol()
const _saveCartCount = Symbol()
const _getCartCount = Symbol()
const _cartCount = Symbol()
const _cartProducts = Symbol()
class Store {
  constructor() {
    this[_cartCount] = 0
    this[_cartProducts] = []
  }
  updateCartCount(cartCount) {
    this[_cartCount] = cartCount
    this[_saveCartCount]()
  }

  [_saveCartCount]() {
    localStorage.setItem('BDCommerce-cart-count', this[_cartCount])
  }

  [_saveProductsData]() {
    localStorage.setItem('BDCommerce-cart', JSON.stringify(this[_cartProducts]))
  }
  updateCart(products) {
    this[_cartProducts] = products
    this[_saveProductsData]()
  }

  getProductsData() {
    if (localStorage.getItem('BDCommerce-cart') === null) {
      return this[_cartProducts]
    } else {
      this[_cartProducts] = JSON.parse(localStorage.getItem('BDCommerce-cart'))
      return this[_cartProducts]
    }
  }

  getCartCount() {
    if (localStorage.getItem('BDCommerce-cart-count') === null) {
      return this[_cartCount]
    } else {
      this[_cartCount] = localStorage.getItem('BDCommerce-cart-count')
      return this[_cartCount]
    }
  }



}

const store = new Store()
export { store }