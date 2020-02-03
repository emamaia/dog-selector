import axios from 'axios'

const config = {
  baseURL: 'https://dog.ceo/api',
  timeout: 1000
}

const protocolo = axios.create(config)

export function getImagem(breed) {
  const url = `./breed/${breed}/images/random`
  return protocolo.get(url)
}