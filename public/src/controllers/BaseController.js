class BaseController {
  constructor(model, view, fb, tappay) {
    this.model = model;
    this.view = view;
    this.fb = fb;
    this.tappay = tappay;

    this.view.bindInputSearchPressEnter(this.redirectToIndexPageWithTag);
    this.view.bindClickProfile(this.handleClickProfile.bind(this));
  }

  init() {
    this.view.handleTag(this.paramsTag);
    this.view.renderCount(this.model.cart.items.length);
  }

  get paramsNumber() {
    return this.getParams('number');
  }

  get paramsId() {
    return this.getParams('id');
  }

  get paramsTag() {
    return this.getParams('tag') || 'all';
  }

  getParams(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }

  redirectToIndexPageWithTag(tag) {
    window.location.href = `/?tag=${tag}`;
  }

  async handleClickProfile() {
    if (this.fb.jwtToken) {
      window.location.href = '/profile.html';
    } else {
      const profile = await this.fb.login();
      if (profile) {
        window.alert('登入成功！');
      }
    }
  }
}

export default BaseController;
