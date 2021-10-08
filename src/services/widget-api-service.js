const API_ENDPOINT = 'http://localhost:8082/api';
const WidgetApiService = {
  async getWidgets() {
    const res = await fetch(`${API_ENDPOINT}/widget/all`, {
      headers: {
        token: sessionStorage.token,
      },
    });

    const parseResponse = await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());

    return parseResponse;
  },
  async getWidget(id) {
    const res = await fetch(`${API_ENDPOINT}/widget/single/${id}`);
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
  async updateWidget(data, id) {
    const res = await fetch(`${API_ENDPOINT}/widget/single/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        token: sessionStorage.token,
      },
      body: JSON.stringify(data),
    });
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
  async newWidget(data) {
    const res = await fetch(`${API_ENDPOINT}/widget/post`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        token: sessionStorage.token,
      },
      body: JSON.stringify(data),
    });
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
  deleteWidget(id) {
    return fetch(`${API_ENDPOINT}/widget/single/${id}`, {
      method: 'DELETE',
      headers: {
        token: sessionStorage.token,
      },
    });
  },
};

export default WidgetApiService;
