import { createGoods, findAllGoods, getGoods, editParams} from "../../services/goods.js"
import { getQueryString } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select } from "antd";
import { findAllOrders } from "../../services/order"
import { format } from "url";
import { updateNumber, deleteData, queryAll} from "../../services/shoppingList"
import { clearCart } from "../../services/shoppingCart"

export default {

    namespace: 'shopping_cart',
  
    state: {
      shoppingList: [],
      pagination: {},
      goodsDetail: {},
    },
  
    subscriptions: {
      setup({ dispatch, history}) {  
        history.listen(location => {
          if (location.pathname === "/shoppingCart") {
            dispatch({
              type: 'init',
              payload: {
                pagination: {
                  name: "",
                  pageNumber: 0,
                  pageSize: 10,
                }
              }
            });
          }

          if (location.pathname === "/goods/edit") {
            let id = getQueryString("id", location)
            dispatch({
              type: 'findOne',
              payload: {
                id: id
              }
            });
          }
        });
      },
    },
  
    effects: {
        *init({ payload }, { call, put }) {
          yield put({
            type: "save",
            payload: {
              pagination: payload.pagination
            }
          });
          yield put({
            type: "pullData",
            payload: payload.pagination
          });
        },
        *pullData({ payload }, { put, call, select }){
          let params = payload
          let pagination = yield select(state=>state.shopping_cart.pagination)
          const result = yield call(queryAll, params);
          if (result.data.success === true) {
            let shoppingList = result.data.data.content
            let params = {
              pageNumber: result.data.data.number,
              total: result.data.data.totalElements,
              current: result.data.data.number + 1,
            }
            pagination = {...pagination, ...params}
            yield put({
              type: "save",
              payload: {
                shoppingList: shoppingList,
                pagination: pagination
              }
            });
          } else {
            message.error(result.data.data)
          }
        },
        *createOrder({ payload }, { put, call }) {
          yield put(routerRedux.push('/order/confirm?checkList=' + payload));
        },
        *delete({ payload }, { put, call }) {
          const result = yield call(deleteData, payload);
          if (result.data.success === true) {
            message.success(result.data.data)
            yield put({
              type: 'init',
              payload: {
                pagination: {
                  name: "",
                  pageNumber: 0,
                  pageSize: 10,
                }
              }
            });
          } else {
            message.error(result.data.data)
          }
        },
        *updateNumber({ payload }, { put, call }) {
          let result = yield call(updateNumber, payload)
          if (result.data.success === true) {
            yield put({
              type: 'init',
              payload: {
                pagination: {
                  name: "",
                  pageNumber: 0,
                  pageSize: 10,
                },
              }
            });
          } else {
            message.error("update number failed!")
          } 
        },
        *clearCart({ payload }, { put, call }) {
          let result = yield call(clearCart, payload)
          if (result.data.success === true) {
            yield put({
              type: 'init',
              payload: {
                pagination: {
                  name: "",
                  pageNumber: 0,
                  pageSize: 10,
                }
              }
            });
          } else {
            message.error("clearCart number failed!")
          } 
        },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  };
  