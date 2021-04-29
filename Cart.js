import { store } from './Store'
class Cart {
  data = []
  cartCount = 0

  getDataFromStorage() {
    this.data = store.getProductsData()
    this.cartCount = store.getCartCount()
  }
  add(product) {
    this.cartCount++

    const foundCartProductIndex = this.data.findIndex(cartProduct => cartProduct.id === product.id)

    if (foundCartProductIndex >= 0) {
      this.data[foundCartProductIndex].count++
    } else {
      this.data.push({
        ...product,
        count: 1
      })
    }

    //update store
    //store.updateCart(this.data)
    //update to the store
    //store.updateCartCount(this.cartCount)
  }
  decrement(product) {
    this.cartCount--
    const foundCartProductIndex = this.data.findIndex(cartProduct => cartProduct.id === product.id)

    if (foundCartProductIndex >= 0) {
      this.data[foundCartProductIndex].count--
    }
    //update store
    //store.updateCart(this.data)
    //update to the store
    //store.updateCartCount(this.cartCount)
    //
  }
  get cartCount() {
    return this.cartCount
  }
  incrementCount(product) {
    this.add(product)
  }
  decrementCount(product) {
    if (this.cartCount > 0) {
      this.decrement(product)
    }
  }

  remove(product) {
    const findIndex = this.data.findIndex(cartProduct => product.id === cartProduct.id)
    this.cartCount -= this.data[findIndex].count
    const filteredProduct = this.data.filter(cartProduct => cartProduct.id !== product.id)
    this.data = filteredProduct

    console.log(this.data)
  }

}



const cart = new Cart()
export { cart }