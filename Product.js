class Product {
  data = []
  products = []
  async getProductsWithCategories() {
    const response = await fetch(`http://localhost:3000/categories?_embed=products`)
    const categories = await response.json()
    this.data = [...this.data, ...categories]
    this.collectProduct(this.data)
    return this.data
  }
  collectProduct(categories) {
    categories.forEach(category => {
      this.products.push(...category.products)
    })
  }
  findProduct(id) {
    return this.products.find(product => product.id === id)
  }
}



const product = new Product()
export { product } 