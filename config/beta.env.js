'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"beta"',
  api: JSON.stringify('//betahy2api.tian-wang.com'),
  yingshiBaseUrl: '"https://open.ys7.com"',
})
