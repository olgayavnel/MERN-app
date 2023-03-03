import http from './http-common';
import { AxiosResponse } from 'axios';
import { Panda } from '../models';

class PandasDataService {
  getAll(
    page = 0
  ): Promise<AxiosResponse<{ pandas: Panda[]; totalPages: number }>> {
    return http.get<{ pandas: Panda[]; totalPages: number }>(
      `pandas?page=${page}`
    );
  }

  getOne(id: string): Promise<AxiosResponse<Panda>> {
    return http.get<Panda>(`pandas/${id}`);
  }

  create(data: Panda): Promise<AxiosResponse<Panda>> {
    return http.post<Panda>('pandas', data);
  }

  update(id: string, data: Panda): Promise<AxiosResponse<Panda>> {
    return http.put<Panda>(`pandas/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<Panda>> {
    return http.delete(`pandas/${id}`);
  }

  deleteAll(): Promise<AxiosResponse<Panda>> {
    return http.delete('pandas');
  }

  find(
    query: string,
    by: string = 'name',
    page: number = 0
  ): Promise<AxiosResponse<{ pandas: Panda[] }>> {
    return http.get<{ pandas: Panda[] }>(`pandas?${by}=${query}&page=${page}`);
  }
}

const pandasDataService = new PandasDataService();
export default pandasDataService;
