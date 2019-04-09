import { Indicator } from 'mint-ui';
import _ from 'lodash';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { Toast } from 'mint-ui';

const _cache = {};
const rc = {
  set(key, rs){
    const data = {
      data : rs,
      t : Date.now()
    }
    _.set(_cache, key, data);
  },
  get(key){
    const rs = _.get(_cache, key, null);
    if(!rs) return null;
    const data = rs.data;
    if(Date.now() - rs.t > 1000*60*30){
      return null;
    }
    
    return data;
  }
};

const ls = {
  set(key, value){
    const d = {
      data : value,
      t : Date.now()
    };
    localStorage.setItem(key, JSON.stringify(d));
  },
  get(key){
    const rs = localStorage.getItem(key);
    if(!rs) return null;
    const json = JSON.parse(rs);
    return json.data;
  }
};
window._cache = _cache;
export default{
  _,
  moment,
  rc,
  ls,
  loading(flag=false){
    if(flag){
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
    }
    else{
      Indicator.close();
    }
  },

  request(param={}, mockResult={}){
    return new Promise((resolve)=>{
      _.delay(()=>{
        resolve(mockResult);
      }, 1000)
    })

  },

  register: PubSub.subscribe,
  publish: PubSub.publish,

  toastSuccess(msg){
    Toast({
      message: msg,
      className: 'kg-toast',
      iconClass: 'fa fa-check'
    });
  },

  toastInfo(msg){
    Toast({
      message: msg,
      className: 'kg-toast',
      position: 'bottom',
      duration: 3000
    });
  },

}