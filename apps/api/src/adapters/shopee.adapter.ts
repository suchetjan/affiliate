import mockData from '../mocks/shopee.json';

export class ShopeeAdapter {
  async fetchProduct() {
    const data = mockData;
    if (!data) return null;

    return {
      marketplace: 'shopee',
      title: data.title,
      image_url: data.image_url,
      store_name: data.store_name,
      price: data.price,
    };
  }
}
