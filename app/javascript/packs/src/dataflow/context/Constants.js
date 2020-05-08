// this is used to dynamically shwitch the default base url depending ot the environnement
const prod = {
    url: {
        API_URL: 'http://localhost:3000' 
    }
}

const dev = {
 url: {
  API_URL: 'http://localhost:3000/api/v1' 
 }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;


