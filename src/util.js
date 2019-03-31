import { Indicator } from 'mint-ui';
import _ from 'lodash';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { Toast } from 'mint-ui';

export default{
  _,
  moment,
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
  }
}