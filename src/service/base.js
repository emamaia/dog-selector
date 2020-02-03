import axios from 'axios'

const config = {
  baseURL: 'https://dog.ceo/api/breeds/list',
  timeout: 1000
}

const protocolo = axios.create(config)

export function getDogs() {
  const url = './all'
  return protocolo.get(url)
}