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

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config)
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config)
  }
}

export const httpClient: HttpClient = new AxiosHttpClient()

