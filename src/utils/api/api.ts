import { API_URL } from '../config'
import { axios } from './customAxios'

const CURRENCY_URL = `${API_URL}/mini-apps/rates`

export const CurrencyAPI = {
  getCurrencies: () => {
    return axios.get(CURRENCY_URL)
  }
}
