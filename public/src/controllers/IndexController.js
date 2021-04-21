import BaseController from './BaseController.js';

import api from '../utils/Api.js';
class IndexController extends BaseController {
  constructor(model, view, fb, tappay) {
    super(model, view, fb, tappay);

    this.nextPaging = 0;
    this.isFetching = false;

    this.interval = undefined;
    this.intervalTime = 5000;

    this.view.bindScrollToBottom(this.getMoreProducts.bind(this));
  }

  init() {
    super.init();
    this.fb.init();
    this.getCampaigns();
    this.getMoreProducts();
  }

  get isPredefinedTag() {
    return ['women', 'men', 'accessories', 'all'].indexOf(this.paramsTag) > -1;
  }

  getMoreProducts() {
    if (this.isFetching || this.nextPaging === undefined) return;

    this.isFetching = true;

    (this.isPredefinedTag
      ? api.getProducts(this.paramsTag, this.nextPaging)
      : api.searchProducts(this.paramsTag, this.nextPaging)
    ).then(({ data: products, next_paging }) => {
      this.isFetching = false;
      this.nextPaging = next_paging;
      this.model.setProducts(products);
      this.onProductsChanged(this.model.products);
    });
  }

  getCampaigns() {
    api.getCampaigns().then(({ data: campaigns }) => {
      this.model.setCampaigns(campaigns);
      this.onCampaignsChanged(
        this.model.campaigns,
        this.model.activeCampaignIndex
      );
      this.setupInterval();
    });
  }

  onProductsChanged(products) {
    if (products.length === 0) {
      this.view.renderNoProductsText();
    } else {
      this.view.renderProducts(products);
    }
  }

  onCampaignsChanged(campaigns, index) {
    this.view.renderCampaigns(campaigns);
    this.view.setActiveCampaign(index);
    this.view.bindClickDot(this.handleClickDot.bind(this));
  }

  onActiveCampaignChanged(index) {
    this.view.setActiveCampaign(index);
  }

  handleClickDot(index) {
    this.model.setActiveCampaignIndex(index);
    this.onActiveCampaignChanged(this.model.activeCampaignIndex);
    this.setupInterval();
  }

  handleInterval() {
    this.model.setNextActiveCampaignIndex();
    this.onActiveCampaignChanged(this.model.activeCampaignIndex);
  }

  setupInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = window.setInterval(
      this.handleInterval.bind(this),
      this.intervalTime
    );
  }
}

export default IndexController;
