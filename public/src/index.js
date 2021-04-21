import IndexController from './controllers/IndexController.js';
import IndexModel from './models/IndexModel.js';
import Cart from './utils/Cart.js';
import Fb from './utils/Fb.js';
import Tappay from './utils/Tappay.js';
import IndexView from './views/IndexView.js';

const app = new IndexController(
  new IndexModel(new Cart()),
  new IndexView(),
  new Fb(),
  new Tappay()
);

app.init();
