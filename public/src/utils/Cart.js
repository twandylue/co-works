class Cart {
  constructor() {
    this.items = JSON.parse(window.localStorage.getItem('cart') || '[]');
  }

  static calculateSubtotal(items) {
    return items.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    );
  }

  update() {
    window.localStorage.setItem('cart', JSON.stringify(this.items));
  }
}

export default Cart;
