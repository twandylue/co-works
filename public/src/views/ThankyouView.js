import BaseView from './BaseView.js';

class ThankyouView extends BaseView {
  constructor() {
    super();

    this.number = this.getElement('#number');
  }

  renderNumber(number) {
    this.number.textContent = number;
  }
}

export default ThankyouView;
