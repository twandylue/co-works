import BaseView from './BaseView.js';

class ProductView extends BaseView {
  constructor() {
    super();

    this.product = this.getElement('#product');
    this.productMainImage = this.getElement('.product__main-image');
    this.productTitle = this.getElement('.product__title');
    this.productId = this.getElement('.product__id');
    this.productPrice = this.getElement('.product__price');
    this.productNote = this.getElement('.product__note');
    this.productTexture = this.getElement('.product__texture');
    this.productDescription = this.getElement('.product__description');
    this.productWash = this.getElement('.product__wash');
    this.productPlace = this.getElement('.product__place');
    this.productStory = this.getElement('.product__story');

    this.productColors = this.getElement('#colors');
    this.productSizes = this.getElement('#sizes');
    this.productQuantity = this.getElement('#quantity');
    this.increment = this.getElement('#increment');
    this.decrement = this.getElement('#decrement');
    this.addToCart = this.getElement('#add-to-cart');
    this.productColorList = [];
    this.productSizeList = [];
  }

  renderProductDetail(product) {
    this.productMainImage.setAttribute('src', product.main_image);
    this.productTitle.textContent = product.title;
    this.productId.textContent = product.id;
    this.productPrice.textContent = `TWD.${product.price}`;
    this.productNote.textContent = product.note;
    this.productTexture.textContent = product.texture;
    this.productDescription.textContent = product.description;
    this.productWash.textContent = `清洗：${product.wash}`;
    this.productPlace.textContent = `產地：${product.place}`;
    this.productStory.textContent = product.story;

    product.images.forEach((image) => {
      this.createElement('img', {
        classList: ['product__image'],
        attributes: {
          src: image,
        },
        parent: this.product,
      });
    });
  }

  renderProductColors(product, selectedColorCode) {
    this.productColors.innerHTML = '';

    this.colorList = product.colors.map((color) => {
      const isSelected = selectedColorCode === color.code;

      const classList = ['product__color'];
      if (isSelected) classList.push('product__color--selected');

      return this.createElement('div', {
        classList,
        styles: {
          backgroundColor: `#${color.code}`,
        },
        parent: this.productColors,
      });
    });
  }

  renderProductSizes(product, selectedColorCode, selectedSize) {
    this.productSizes.innerHTML = '';

    this.sizeList = product.sizes.map((size) => {
      const isSelected = selectedSize === size;
      const isDisabled =
        product.variants.find(
          (variant) =>
            variant.color_code === selectedColorCode && variant.size === size
        ).stock === 0;

      const classList = ['product__size'];
      if (isSelected) classList.push('product__size--selected');
      if (isDisabled) classList.push('product__size--disabled');

      return this.createElement('div', {
        classList,
        children: [size],
        parent: this.productSizes,
      });
    });
  }

  renderProductQuantity(quantity) {
    this.productQuantity.innerHTML = '';

    this.productQuantity.textContent = quantity;
  }

  renderProductVariant(product, selectedColorCode, selectedSize, quantity) {
    this.renderProductColors(product, selectedColorCode);
    this.renderProductSizes(product, selectedColorCode, selectedSize);
    this.renderProductQuantity(quantity);
  }

  bindClickColorCode(handler) {
    this.colorList.forEach((color, index) => {
      color.addEventListener('click', () => {
        handler(index);
      });
    });
  }

  bindClickSize(handler) {
    this.sizeList.forEach((size, index) => {
      size.addEventListener('click', () => {
        handler(index);
      });
    });
  }

  bindClickIncrement(handler) {
    this.increment.addEventListener('click', () => {
      handler();
    });
  }

  bindClickDecrement(handler) {
    this.decrement.addEventListener('click', () => {
      handler();
    });
  }

  bindClickAddToCart(handler) {
    this.addToCart.addEventListener('click', () => {
      handler();
    });
  }
}

export default ProductView;
