import http from './http-common';

class PandasDataService {
  getAll(page = 0) {
    return http.get(`pandas?page=${page}`);
  }

  find(query, by = 'name', page = 0) {
    return http.get(`pandas?${by}=${query}&page=${page}`);
  }
}

const pandasDataService = new PandasDataService();
export default pandasDataService;
