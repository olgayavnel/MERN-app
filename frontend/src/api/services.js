import http from './http-common';

class PandasDataService {
  getAll(page = 0) {
    return http.get(`pandas?page=${page}`);
  }

  get(id) {
    return http.get(`pandas/${id}`);
  }

  create(data) {
    return http.post('pandas', data);
  }

  update(id, data) {
    return http.put(`pandas/${id}`, data);
  }

  delete(id) {
    return http.delete(`pandas/${id}`);
  }

  deleteAll() {
    return http.delete('pandas');
  }

  find(query, by = 'name', page = 0) {
    return http.get(`pandas?${by}=${query}&page=${page}`);
  }
}

const pandasDataService = new PandasDataService();
export default pandasDataService;
