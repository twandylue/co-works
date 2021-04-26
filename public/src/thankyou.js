import ThankyouController from './controllers/ThankyouController.js';
import ThankyouModel from './models/ThankyouModel.js';
import Cart from './utils/Cart.js';
import Fb from './utils/Fb.js';
import Tappay from './utils/Tappay.js';
import ThankyouView from './views/ThankyouView.js';

const app = new ThankyouController(
  new ThankyouModel(new Cart()),
  new ThankyouView(),
  new Fb(),
  new Tappay()
);

app.init();
