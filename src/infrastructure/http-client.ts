import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { config } from '@/config/envs'

export interface HttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
}

class AxiosHttpClient implements HttpClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: config.apiUrl,
    })

    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error)
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.client.get(url, config)
    return data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const { data: response } = await this.client.post(url, data, config)
    return response;
  }
}

export const httpClient: HttpClient = new AxiosHttpClient()

