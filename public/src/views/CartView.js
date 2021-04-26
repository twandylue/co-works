import BaseView from './BaseView.js';
import Cart from '../utils/Cart.js';

class CartView extends BaseView {
  constructor() {
    super();

    this.items = this.getElement('#items');
    this.cartTitle = this.getElement('#title');
    this.cartSubtotal = this.getElement('#subtotal span');
    this.cartTotal = this.getElement('#total span');
    this.checkout = this.getElement('#checkout');
    this.itemSelectList = undefined;
    this.itemRemoveList = undefined;
  }

  renderCartItems(items) {
    this.items.innerHTML = '';
    this.itemSelectList = [];
    this.itemRemoveList = [];

    items.forEach((item) => {
      const itemSelect = this.createElement('select', {
        children: new Array(item.stock).fill().map((_, index) => {
          const attributes = {
            value: index + 1,
          };
          if (index + 1 === item.qty) attributes.selected = 'selected';
          return this.createElement('option', {
            children: [index + 1],
            attributes,
          });
        }),
      });

      this.itemSelectList.push(itemSelect);

      const itemRemove = this.createElement('div', {
        classList: ['item__remove'],
        children: [
          this.createElement('img', {
            attributes: { src: './images/cart-remove.png' },
          }),
        ],
      });

      this.itemRemoveList.push(itemRemove);

      this.createElement('div', {
        classList: ['item'],
        parent: this.items,
        children: [
          this.createElement('img', {
            classList: ['item__image'],
            attributes: {
              src: item.image,
            },
          }),
          this.createElement('div', {
            classList: ['item__detail'],
            children: [
              this.createElement('div', {
                classList: ['item__name'],
                children: [item.name],
              }),
              this.createElement('div', {
                classList: ['item__id'],
                children: [item.id],
              }),
              this.createElement('div', {
                classList: ['item__color'],
                children: [`顏色｜${item.color.name}`],
              }),
              this.createElement('div', {
                classList: ['item__size'],
                children: [`尺寸｜${item.size}`],
              }),
            ],
          }),
          this.createElement('div', {
            classList: ['item__quantity'],
            children: [
              this.createElement('div', {
                classList: ['mobile-text'],
                children: ['數量'],
              }),
              itemSelect,
            ],
          }),
          this.createElement('div', {
            classList: ['item__price'],
            children: [
              this.createElement('div', {
                classList: ['mobile-text'],
                children: ['單價'],
              }),
              `NT.${item.price}`,
            ],
          }),
          this.createElement('div', {
            classList: ['item__subtotal'],
            children: [
              this.createElement('div', {
                classList: ['mobile-text'],
                children: ['小計'],
              }),
              `NT.${item.price * item.qty}`,
            ],
          }),
          itemRemove,
        ],
      });
    });

    const subtotal = Cart.calculateSubtotal(items);

    this.cartTitle.textContent = `購物車(${items.length})`;
    this.cartSubtotal.textContent = subtotal;
    this.cartTotal.textContent = subtotal + 60;
  }

  bindChangeItemSelect(handle) {
    this.itemSelectList.forEach((itemSelect, index) => {
      itemSelect.addEventListener('change', (e) => {
        handle(index, Number(e.target.value));
      });
    });
  }

  bindClickItemRemove(handle) {
    this.itemRemoveList.forEach((itemRemove, index) => {
      itemRemove.addEventListener('click', () => {
        handle(index);
      });
    });
  }

  bindClickCheckout(handle) {
    this.checkout.addEventListener('click', () => {
      const recipient = {
        name: this.getElement('#name').value.trim(),
        phone: this.getElement('#phone').value.trim(),
        email: this.getElement('#email').value.trim(),
        address: this.getElement('#address').value.trim(),
        time: this.getElement('input[name=time]:checked').value,
      };
      handle(recipient);
    });
  }
}

export default CartView;
