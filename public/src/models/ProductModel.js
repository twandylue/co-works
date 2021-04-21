import BaseModel from './BaseModel.js';

class ProductModel extends BaseModel {
  constructor(cart) {
    super(cart);

    this.product = undefined;
    this.selectedColorCode = undefined;
    this.selectedSize = undefined;
    this.quantity = undefined;
  }

  findFirstValidVariant(product, colorCode) {
    return product.variants.find((variant) => {
      const isColorCodeEqual = colorCode
        ? variant.color_code === colorCode
        : true;
      return isColorCodeEqual && variant.stock > 0;
    });
  }

  findEqualVariant(colorCode, size) {
    return this.product.variants.find(
      (variant) => variant.color_code === colorCode && variant.size === size
    );
  }

  setProduct(product) {
    this.product = product;
    const firstValidVariant = this.findFirstValidVariant(this.product);
    this.selectedColorCode = firstValidVariant.color_code;
    this.selectedSize = firstValidVariant.size;
    this.quantity = 1;
  }

  changeColorCode(index) {
    const targetColorCode = this.product.colors[index].code;
    const isChanged = this.selectedColorCode !== targetColorCode;
    if (isChanged) {
      this.selectedColorCode = targetColorCode;
      if (
        this.findEqualVariant(this.selectedColorCode, this.selectedSize)
          .stock === 0
      ) {
        this.selectedSize = this.findFirstValidVariant(
          this.product,
          this.selectedColorCode
        ).size;
      }
      this.quantity = 1;
    }
  }

  changeSize(index) {
    const targetSize = this.product.sizes[index];
    const isChanged = this.selectedSize !== targetSize;
    const isValid =
      this.findEqualVariant(this.selectedColorCode, targetSize).stock !== 0;
    if (isChanged && isValid) {
      this.selectedSize = targetSize;
      this.quantity = 1;
    }
  }

  incrementQuantity() {
    const isMaximum =
      this.quantity ===
      this.findEqualVariant(this.selectedColorCode, this.selectedSize).stock;
    if (isMaximum) return;
    this.quantity += 1;
  }

  decrementQuantity() {
    const isMinimum = this.quantity === 1;
    if (isMinimum) return;
    this.quantity -= 1;
  }

  addToCart() {
    const cartItems = this.cart.items;
    const sameProductIndex = cartItems.findIndex(
      (item) =>
        item.id === this.product.id &&
        item.color.code === this.selectedColorCode &&
        item.size === this.selectedSize
    );
    if (sameProductIndex > -1) {
      cartItems[sameProductIndex].qty = this.quantity;
    } else {
      cartItems.push({
        id: this.product.id,
        name: this.product.title,
        price: this.product.price,
        color: this.product.colors.find(
          (color) => color.code === this.selectedColorCode
        ),
        size: this.selectedSize,
        qty: this.quantity,
        image: this.product.main_image,
        stock: this.product.variants.find(
          (variant) =>
            variant.color_code === this.selectedColorCode &&
            variant.size === this.selectedSize
        ).stock,
      });
    }
    this.cart.update();
    window.alert('已加入購物車');
  }
}

export default ProductModel;
