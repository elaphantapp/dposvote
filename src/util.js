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
  // callbackUrl : 'http://192.168.1.102:8080/#/return_url',
  // callbackUrl : '',
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
    // queryString = '%7B%22Data%22%3A%22%7B%5C%22BTCAddress%5C%22%3A%5C%221PncAFvqJ3oxBEvwKZYUDhzsujMbQRhDLM%5C%22%2C%5C%22DID%5C%22%3A%5C%22iUTRuu8Pt9nMEmWVzKwD2DhhyQcPUbjVnp%5C%22%2C%5C%22ELAAddress%5C%22%3A%5C%22ENaaqePNBtrZsNbs9uc35CPqTbvn8oaYL9%5C%22%2C%5C%22EMail%5C%22%3A%5C%22%5C%22%2C%5C%22ETHAddress%5C%22%3A%5C%220x6001f701d41ac5D0fca3aE9a258982EB9888C37c%5C%22%2C%5C%22Nickname%5C%22%3A%5C%22low%E5%9B%BE%E5%90%90%E4%BA%86%5C%22%2C%5C%22PhoneNumber%5C%22%3A%5C%22%5C%22%2C%5C%22PublicKey%5C%22%3A%5C%22032a3cb74e66879690b6f5bb41e032451bc7abe5ee3b72955f754b25e44dbfce73%5C%22%2C%5C%22RandomNumber%5C%22%3A%5C%22123456%5C%22%7D%22%2C%22PublicKey%22%3A%22032a3cb74e66879690b6f5bb41e032451bc7abe5ee3b72955f754b25e44dbfce73%22%2C%22Sign%22%3A%22aa9dd89cb96a0c10db0b621d6dcf8e0e8b2c6455a754190258513b28cd93c8ff224c3a81748e30a6357181ed111da3ed318bec30815572d2a1f0e7682b06b6d9%22%7D'
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
    const t = location.hash.replace(_user_data.callbackUrl, '').replace(/%09/g, '');
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = decodeURIComponent(t).substr(1).match(reg);
    if (r) return unescape(r[2]);
    return null;
  },


  buildRequestUserDataUrl(){
    const d = _user_data;

    const rt = encodeURIComponent(d.callbackUrl);
    let url = `elaphant://identity?ReturnUrl=${rt}&AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&Signature=${d.appSign}&DID=${d.appDid}&RandomNumber=${d.random}&AppName=${d.appName}&RequestInfo=RandomNumber,Email,phoneNumber,Nickname,btcaddress,ethaddres`;

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

    let xx = `
    elaphant://eladposvote?AppID=14bd1d772afc8e633ce95b988646bd9ed5df65cb33ec98a43b41e6cb6de5276ca9cce91d069dc688619f1a250842b37d380d4fb984c9f912a2f86edcf5dddba9&PublicKey=03ef5f8b0534c82aa4db218f7cead278124efc0411e4ca38b6131954a58e8ae3c0&Sign=298bd67a87865117f94689eb853de85119a74feedbbbe720ce63db40f698a2048f8bedef059a2980dfb17c8d8851d872748ec931e8354cdc65b28116165a416a&DID=igjFHgkyjxMp2dCCVLZ2JosXgDcunauX8D&AppName=vote.h5.app&ReturnUrl=https://www.vote.org&CallbackUrl=https://www.vote.org&CandidatePublicKeys=["02f033b85ada2c9aceb5a25fe4e6f09bd5294cab0254e1a5650cc1182cb324dde2","03477bcd06aa2eeff56f68f2b5608da93d0452b57925fd88dc4491b8406ef53380","0340a6b762eb5bdacc93ed2481a53b580ba517b18596aa64249b5135588cd3260f","02ae26793e4d1c8eafa8337f025b96a9aa95ceea31400ab505e47fc4e141f9c81e","037f7e9adc693b953eed1f76fcbbf51999f06d8e16e06de2ce3769eceb01b954e7"]
    `

    console.log('vote schema => '+url);
    location.href = url;
    
    return url;
  }

}