import BaseView from './BaseView.js';

class IndexView extends BaseView {
  constructor() {
    super();

    this.scrollToBottomOffset = 240;
    this.products = this.getElement('#products');
    this.noProducts = this.getElement('#no-products');
    this.campaigns = this.getElement('#campaigns');
    this.campaignList = [];
    this.dotList = [];
  }

  renderProducts(products) {
    products.forEach((product) => {
      this.createElement('a', {
        classList: ['product'],
        attributes: {
          href: `/product.html?id=${product.id}`,
        },
        parent: this.products,
        children: [
          this.createElement('img', {
            attributes: {
              src: product.main_image,
            },
          }),
          this.createElement('div', {
            classList: ['product__colors'],
            children: product.colors.map((color) =>
              this.createElement('div', {
                classList: ['product__color'],
                styles: {
                  backgroundColor: `#${color.code}`,
                },
              })
            ),
          }),
          this.createElement('div', {
            classList: ['product__title'],
            children: [product.title],
          }),
          this.createElement('div', {
            classList: ['product__price'],
            children: [`TWD.${product.price}`],
          }),
        ],
      });
    });
  }

  renderNoProductsText() {
    this.createElement('h2', {
      parent: this.noProducts,
      children: ['搜尋不到產品喔'],
    });
  }

  renderCampaigns(campaigns) {
    this.campaigns.innerHTML = '';

    this.campaignList = campaigns.map((campaign) => {
      return this.createElement('a', {
        classList: ['campaign'],
        styles: {
          backgroundImage: `url(${campaign.picture})`,
        },
        attributes: {
          href: `/product.html?id=${campaign.product_id}`,
        },
        parent: this.campaigns,
        children: [
          this.createElement('div', {
            classList: ['campaign__story'],
            children: [campaign.story],
          }),
        ],
      });
    });

    this.dotList = campaigns.map(() => {
      return this.createElement('div', {
        classList: ['dot'],
      });
    });

    this.createElement('div', {
      classList: ['dots'],
      parent: this.campaigns,
      children: this.dotList,
    });
  }

  setActiveCampaign(activeIndex) {
    this.campaignList.forEach((campaign, index) => {
      campaign.classList.remove('campaign--active');
      if (index === activeIndex) {
        campaign.classList.add('campaign--active');
      }
    });
    this.dotList.forEach((dot, index) => {
      dot.classList.remove('dot--active');
      if (index === activeIndex) {
        dot.classList.add('dot--active');
      }
    });
  }

  bindClickDot(handler) {
    this.dotList.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        handler(index);
      });
    });
  }

  bindScrollToBottom(handler) {
    window.addEventListener('scroll', () => {
      if (
        document.body.getBoundingClientRect().bottom - window.innerHeight <
        this.scrollToBottomOffset
      ) {
        handler();
      }
    });
  }
}

export default IndexView;
