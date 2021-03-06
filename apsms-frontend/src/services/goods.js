import request from '../utils/request';
import { push } from 'react-router-redux';

export async function createGoods(params) {
  return request({
    url: `/goods/create`,
    method: `post`,
    data: params
  })
}

export async function findAllGoods(params) {
  return request({
    url: `/goods/findAll`,
    method: `post`,
    params: params
  })
}

export async function deleteData(params) {
  return request({
    url: `/goods/delete`,
    method: `delete`,
    data: params
  })
}

export async function getGoods(params) {
  return request({
    url: `/goods/getGoods`,
    method: 'get',
    params: params
  })
}

export async function editParams(params) {
  return request({
    url: `/goods/update`,
    data: params,
    method: "put"
  })
}

export async function changeStock(params) {
  return request({
    url: `/goods/stock`,
    params: params,
    method: "put"
  })
}