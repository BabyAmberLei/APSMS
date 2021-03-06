
import { routerRedux } from 'dva/router';
import { message } from "antd";
import { getUserInfo, updateInfo} from "../../services/user.js"
import { findAllAddress, createAddress, deleteAddress} from "../../services/address"

export default {

    namespace: 'personal_information',
  
    state: {
      user: {},
      addresses: []
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
          history.listen(location => {
            if (location.pathname === "/personal/information") {
              dispatch({
                type: 'getUserInfo',
                payload: {

                }
              });
              dispatch({
                type: 'findAllAddress',
                payload: {

                }
              });
            }
          });
      },
    },
  
    effects: {
      *getUserInfo({ payload }, { put, call }) {    
        const result = yield call(getUserInfo);
        if (result.data.success === true ) {
          let user = result.data.data
          yield put({
            type: 'save',
            payload: {
              user: user
            } 
          })
        } else {
          message.warn(result.data.data);
        }
      },
      *findAllAddress({ payload }, { put, call }) {
        let result = yield call(findAllAddress)
        if (result.data.success === true) {
          yield put({
            type: "save",
            payload: {
              addresses: result.data.data
            }
          })
        } else {
          message.error(result.data.data)
        }
      },
      *updateInfo({ payload }, { put, call }) {
        let result = yield call(updateInfo, payload)
        if (result.data.success === true) {
          yield put({
            type: "save",
            payload: {
              user: result.data.data
            }
          })
          message.success("update success!")
        } else {
          message.error("update fail!")
        }
      },
      *createAddress({ payload }, { put, call }) {
        let result = yield call(createAddress, payload)
        console.log(result)
        if (result.data.success === true) {
          yield put({
            type: "findAllAddress",
            payload: {}
          })
          message.success("add address success!")
        } else {
          message.error("add address fail!")
        }
      },
      *deleteAddress({ payload }, { put, call }) {
        let params = {
          id: payload
        }
        let result = yield call(deleteAddress, params)
        console.log(result)
        if (result.data.success === true) {
          yield put({
            type: "findAllAddress",
            payload: {}
          })
          message.success("delete address success!")
        } else {
          message.error("delete address fail!")
        }
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  