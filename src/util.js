import { Indicator } from 'mint-ui';
import _ from 'lodash';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { Toast } from 'mint-ui';


const config = {
  appId : '317DD1D2188C459EB24EAEBC81932F6ADB305FF66F073AB1DC767869EF2B1A04273A8A8754652DA3B89E7692BEA99FA3A1E0B2CD767377300AA4A7B0E8C7D00E',
  appName : 'dopsvote.h5.app',
  appSign : '4109FDAD1EB5D3AD2B02D4BC62822268E0F04FCE0FF3A82D2AF1A6B88787815D920026D209154B3BCEC210B73418613E2358E8EE326F6C8F536AFD7EABAE5C99',
  appDid : 'iiJRtAn6wyHaMSDQPS9Kkft3iiNjH5tTmi',
  appDidPublicKey: '02752F9483DF73C57EDEA1F84F2431DC1036B2643F9519E78CB660D8C332793EDC',
  appDidPrivateKey: '462B93F275E0458F838BFAC195EE32BBD21D71DE794938572A9F9F5FF7AE80D6',
  appDidMnemonic: 'quote milk ring ketchup refuse chief float please water march car tone',
  callbackUrl : 'https://liyangwood.github.io/dpos_vote/#/return_url',
  // callbackUrl : 'http://192.168.1.107:8080/#/return_url',
  random : '998877'
};
const _user_data = {
  ...config
};

const isChrome = ()=>{
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('chrome') !== -1 && ua.indexOf('android') === -1;
}

const getUrlParam = (name, url)=>{
  url = url || location.hash;
  const t = url.replace('#/return_url', '').replace(/%09/g, '');
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = decodeURIComponent(t).substr(1).match(reg);
  if (r) return unescape(r[2]);
  return null;
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
    if(!d || !d['Sign']){
      return null;
    }

    return d;
  },
  setUserData(queryString){
    queryString = queryString || location.hash;

    const Data = getUrlParam('Data', queryString);
 
    const tmp = JSON.parse(decodeURIComponent(Data));
    tmp.Sign = getUrlParam('Sign', queryString);
    
    const d = {
      Data : tmp,
      PublicKey : tmp.PublicKey,
      Sign : tmp.Sign
    };
    _.extend(_user_data, d);
    console.log(2, _user_data); 
    // ls.set('user-data', _user_data);
  },

  getUrlParam,


  buildRequestUserDataUrl(){
    const d = _user_data;

    const rt = encodeURIComponent(d.callbackUrl);
    let url = `elaphant://identity?ReturnUrl=${rt}&AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&Signature=${d.appSign}&DID=${d.appDid}&RandomNumber=${d.random}&AppName=${d.appName}&RequestInfo=elaaddress`;

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