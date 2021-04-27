class Api {
  constructor() {
    this.API_HOST = 'https://api.appworks-school.tw/api/1.0';
    this.accessToken = undefined;
  }

  async getProducts(category, paging) {
    const response = await fetch(
      `${this.API_HOST}/products/${category}?paging=${paging}`
    );
    return await response.json();
  }

  async getCampaigns() {
    const response = await fetch(`${this.API_HOST}/marketing/campaigns`);
    return await response.json();
  }

  async searchProducts(keyword, paging) {
    const response = await fetch(
      `${this.API_HOST}/products/search?keyword=${keyword}&paging=${paging}`
    );
    return await response.json();
  }

  async getProduct(id) {
    const response = await fetch(`${this.API_HOST}/products/details?id=${id}`);
    return await response.json();
  }

  async checkout(data) {
    if (!this.accessToken) {
      throw new Error('請先登入');
    }
    const response = await fetch(`${this.API_HOST}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      }),
      method: 'POST',
    });
    if (response.status === 401) {
      throw new Error('請先登入');
    }
    if (response.status === 403) {
      throw new Error('內容錯誤或權限不足');
    }
    return await response.json();
  }

  async signin(data) {
    const response = await fetch(`${this.API_HOST}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
    const json = await response.json();
    this.accessToken = json.data.access_token;
    return json;
  }
}

export default new Api();
