class Product {
  data = []
  async getProductsWithCategories() {
    const response = await fetch(`http://localhost:3000/categories?_embed=products`)
    const categories = await response.json()
    this.data = [...this.data, ...categories]
    return this.data
  }

  findProduct(id) {
    return this.data.find(product => product.id === id)
  }
}



const product = new Product()
export { product } 