import { Indicator } from 'mint-ui';
import _ from 'lodash';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { Toast } from 'mint-ui';


const config = {
  appId : '23091883A390CCBFFFED4928F996936AFCEBB1B57192532D15271158F3A277FD1BB3309DA2719334CBE1DE7BA2408047E2786A94F370CE66C208159B3A8D1162',
  appName : 'dopsvote.h5.app',
  appDid : 'iZW9ozTSXk4ukRXx7vCTTFYebZHFwMUtz7',
  appDidPublicKey: '03128A35842DD061BD016B9B2913BE07028063E5A80365D713DB77508406E85815',
  callbackUrl : 'https://elaphantapp.github.io/dposvote/#/return_url',
  random : '998877'
};
const _user_data = {
  ...config
};

const isChrome = ()=>{
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('chrome') !== -1 && ua.indexOf('android') === -1;
}

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
window._user_data = _user_data;
export default{
  _,
  moment,
  rc,
  ls,
  isChrome,
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

  getConfig(){
    return config;
  },
  getUserData(){
    // const d = ls.get('user-data');
    const d = _user_data;
    if(!d || !d['PublicKey']){
      return null;
    }

    return d;
  },
  setUserData(queryString){
    
    const tmp = JSON.parse(decodeURIComponent(queryString));
    
    const d = {
      Data : JSON.parse(tmp.Data),
      PublicKey : tmp.PublicKey,
      Sign : tmp.Sign
    };
    _.extend(_user_data, d);

    // ls.set('user-data', _user_data);
  },

  getUrlParam(name){
    const t = location.href.replace(_user_data.callbackUrl, '').replace(/%09/g, '');
    console.log(111, _user_data.callbackUrl, t);
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = decodeURIComponent(t).substr(1).match(reg);
    if (r) return unescape(r[2]);
    return null;
  },


  buildRequestUserDataUrl(){
    const d = _user_data;

    const rt = encodeURIComponent(d.callbackUrl);
    let url = `elaphant://identity?ReturnUrl=${rt}&AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&DID=${d.appDid}&RandomNumber=${d.random}&AppName=${d.appName}&RequestInfo=elaaddress`;

    console.log('login schema => '+url);
    location.href = url;
    
    
    return url;
  },

  buildVoteSchema(nodePublicKeyList){
    const d = _user_data;

    const to = _.map(nodePublicKeyList, (k)=>{
      return '"'+k+'"';
    }).join(',');

    const rt = encodeURIComponent(d.callbackUrl);
    const pp = (`[${to}]`);
    let url = `elaphant://eladposvote?AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&Signature=${d.appSign}&DID=${d.appDid}&AppName=${d.appName}&ReturnUrl=${rt}&CandidatePublicKeys=${pp}`;

    

    console.log('vote schema => '+url);
    location.href = url;
    
    return url;
  }

}