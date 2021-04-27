class Product {
  data = []
  async getProducts() {
    const response = await fetch('http://localhost:3000/products')
    const products = await response.json()
    this.data = [...this.data, ...products]

    return this.data
  }
}



const product = new Product()
export { product } 