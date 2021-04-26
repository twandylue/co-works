import BaseController from './BaseController.js';

class ThankyouController extends BaseController {
  constructor(model, view, fb, tappay) {
    super(model, view, fb, tappay);
  }

  init() {
    super.init();
    this.fb.init();
    this.view.renderNumber(this.paramsNumber);
  }
}

export default ThankyouController;
