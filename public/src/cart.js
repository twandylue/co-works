import CartController from './controllers/CartController.js';
import CartModel from './models/CartModel.js';
import Cart from './utils/Cart.js';
import Fb from './utils/Fb.js';
import Tappay from './utils/Tappay.js';
import CartView from './views/CartView.js';

const app = new CartController(
  new CartModel(new Cart()),
  new CartView(),
  new Fb(),
  new Tappay()
);

app.init();
