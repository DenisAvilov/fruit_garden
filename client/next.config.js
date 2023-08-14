/** @type {import('next').NextConfig} */
require('dotenv').config()
const path = require('path')

const nextConfig = {
  //  env: {
  //   // signInUrl: 'http://signIn.localhost:3000',
  //   // signUpUrl: 'http://signUp.localhost:3000'
   
  // },
   sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
}

module.exports = nextConfig




