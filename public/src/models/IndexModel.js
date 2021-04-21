import BaseModel from './BaseModel.js';

class IndexModel extends BaseModel {
  constructor(cart) {
    super(cart);

    this.products = [];
    this.campaigns = [];
    this.activeCampaignIndex = 0;
  }

  setProducts(products) {
    this.products = products;
  }

  setCampaigns(campaigns) {
    this.campaigns = campaigns;
  }

  setActiveCampaignIndex(index) {
    this.activeCampaignIndex = index;
  }

  setNextActiveCampaignIndex() {
    const currentIndex = this.activeCampaignIndex;
    const nextIndex =
      currentIndex + 1 === this.campaigns.length ? 0 : currentIndex + 1;
    this.activeCampaignIndex = nextIndex;
  }
}

export default IndexModel;
