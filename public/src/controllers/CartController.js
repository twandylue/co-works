import BaseController from './BaseController.js';

import api from '../utils/Api.js';
import Cart from '../utils/Cart.js';
class CartController extends BaseController {
  constructor(model, view, fb, tappay) {
    super(model, view, fb, tappay);
    /**
     * Ref: https://www.w3resource.com/javascript/form/javascript-form-validation.php
     */
    this.emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.phoneRegex = /^\d{10}$/;

    this.view.bindClickCheckout(this.handleClickCheckout.bind(this));
  }

  init() {
    super.init();
    this.fb.init();
    this.tappay.init();
    this.onCartItemsChanged(this.model.cart.items);
  }

  onCartItemsChanged(cartItems) {
    this.view.renderCartItems(cartItems);
    this.view.bindChangeItemSelect(this.handleChangeItemQuantity.bind(this));
    this.view.bindClickItemRemove(this.handleRemoveItem.bind(this));
  }

  handleChangeItemQuantity(index, quantity) {
    this.model.changeCartItemQuantity(index, quantity);
    this.view.renderCount(this.model.cart.items.length);
    this.onCartItemsChanged(this.model.cart.items);
  }

  handleRemoveItem(index) {
    this.model.removeCartItem(index);
    this.view.renderCount(this.model.cart.items.length);
    this.onCartItemsChanged(this.model.cart.items);
  }

  validateRecipient(recipient) {
    if (!recipient.name) {
      return '請輸入收件人姓名';
    }
    if (!recipient.email.match(this.emailRegex)) {
      return 'Email有誤';
    }
    if (!recipient.phone.match(this.phoneRegex)) {
      return '手機號碼有誤';
    }
    if (!recipient.address) {
      return '請輸入收件地址';
    }
    return null;
  }

  makeCheckoutData(prime, cartItems, recipient) {
    const subtotal = Cart.calculateSubtotal(cartItems);
    const order = {
      shipping: 'delivery',
      payment: 'credit_card',
      subtotal: subtotal,
      freight: 60,
      total: subtotal + 60,
      recipient,
      list: cartItems,
    };
    const data = { prime, order };
    return data;
  }

  async handleClickCheckout(recipient) {
    const cartItems = this.model.cart.items;
    if (cartItems.length === 0) {
      window.alert('購物車空空的耶');
      return;
    }

    const recipientError = this.validateRecipient(recipient);
    if (recipientError) {
      window.alert(recipientError);
      return;
    }

    if (this.tappay.canGetPrime) {
      const prime = await this.tappay.getPrime();
      const data = this.makeCheckoutData(prime, cartItems, recipient);
      api
        .checkout(data)
        .then(({ data: { number } }) => {
          this.model.cart.items = [];
          this.model.cart.update();
          window.location.href = `/thankyou.html?number=${number}`;
        })
        .catch((e) => {
          window.alert(e.message);
        });
    } else {
      window.alert(this.tappay.cannotGetPrimeReason);
    }
  }
}

export default CartController;
