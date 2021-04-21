import ProfileController from './controllers/ProfileController.js';
import ProfileModel from './models/ProfileModel.js';
import ProfileView from './views/ProfileView.js';
import Fb from './utils/Fb.js';
import Tappay from './utils/Tappay.js';
import Cart from './utils/Cart.js';

const app = new ProfileController(
  new ProfileModel(new Cart()),
  new ProfileView(),
  new Fb(),
  new Tappay()
);

app.init();
