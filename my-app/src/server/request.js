import axios from "axios";

let request = axios.create({
  /*
  * production: 线上环境
  * development:开发环境
  *
  * npm i  包名  --save-dev : 线上环境 axios element-UI swiper  -dev:开发环境 sass  eslint  glup babel
  *
  * */
  baseURL: process.env.NODE_ENV === "production" ? "" : "",
  timeout: 5000

});

/*
* 请求拦截
* */

request.interceptors.request.use((config) => {
  config.headers.authorization  = `Bearer ${window.localStorage.getItem("token")}`;
  return config;


}, (err) => {

  console.error(err);

});

/*
* 响应
* */
request.interceptors.response.use((response) => {
  
  return response.data;

}, (err) => {

  console.log(err);

});

/*
* 函数*/
let get = (url) => request.get(url);
let post = (url, params) => request.post(url, params || {});

export {
  get, post
}
