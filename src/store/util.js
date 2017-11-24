/**
 * @author monkeywang
 * Date: 17/3/14
 */
import Vue from 'vue'
import $http from 'vue-resource'
Vue.use($http)

let vm = new Vue()

const configPath = ''

export class Utils {
  get (url, data = {}) {
    url = configPath + url
    return new Promise((resolve, reject) => {
      vm.$http.get(url, {params: data, credentials: true}).then((response) => {
        resolve(response.body)
      }, function (response) {
        reject(response.body)
      })
    })
  }
  getHeaders(url, data = {}, headers = {}) {
    url = configPath + url
    return new Promise((resolve, reject) => {
      vm.$http.get(url, {params: data, credentials: true, headers:headers}).then((response) => {
        resolve(response.body)
      }, function (response) {
        reject(response.body)
      })
    })
  }
  put(url, data = {}, headers = {}) {
    url = configPath + url
    return new Promise((resolve, reject) => {
      vm.$http.put(url, data, {credentials: true, headers:headers}).then((response) => {
        resolve(response.body)
      }, function (response) {
        reject(response.body)
      })
    })
  }
  delete(url, data = {}, headers = {}) {
    url = configPath + url
    return new Promise((resolve, reject) => {
      vm.$http.delete(url, {body: data, credentials: true, headers:headers}).then((response) => {
        resolve(response.body)
      }, function (response) {
        reject(response.body)
      })
    })
  }
  post (url, data = {} ,headers = {}) {
    url = configPath + url
    return new Promise((resolve, reject) => {
      vm.$http.post(url, data, {credentials:true, headers:headers}).then((response) => {
        resolve(response.body)
      }, function (response) {
        reject(response.body)
      })
    })
  }
}
