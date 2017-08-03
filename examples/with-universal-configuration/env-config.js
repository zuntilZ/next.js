const { version } = require('./package.json')
const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.VERSION': version,
  'process.env.BACKEND_URL': prod ? 'https://api.example.com' : 'https://localhost:8080'
}
