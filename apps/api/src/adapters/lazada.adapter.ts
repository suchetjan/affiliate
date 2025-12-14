import mockData from '../mocks/lazada.json';

export class LazadaAdapter {
  async fetchProduct() {
    const data = mockData;
    if (!data) return null;

    return {
      marketplace: 'lazada',
      title: data.title,
      image_url: data.image_url,
      store_name: data.store_name,
      price: data.price,
    };
  }
}
