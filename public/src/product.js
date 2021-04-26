import ProductController from './controllers/ProductController';
import ProductModel from './models/ProductModel';
import Cart from './utils/Cart';
import Fb from './utils/Fb';
import Tappay from './utils/Tappay';
import ProductView from './views/ProductView';

const app = new ProductController(
  new ProductModel(new Cart()),
  new ProductView(),
  new Fb(),
  new Tappay()
);

app.init();
