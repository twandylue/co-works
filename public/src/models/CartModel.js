import BaseModel from './BaseModel.js';

class CartModel extends BaseModel {
  constructor(cart) {
    super(cart);
  }

  changeCartItemQuantity(index, quantity) {
    this.cart.items[index].qty = quantity;
    this.cart.update();
  }

  removeCartItem(index) {
    this.cart.items.splice(index, 1);
    this.cart.update();
    window.alert('已從購物車移除');
  }
}

export default CartModel;
