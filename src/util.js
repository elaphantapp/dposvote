import { Indicator } from 'mint-ui';
import _ from 'lodash';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { Toast } from 'mint-ui';

const _user_data = {
  appId : '14bd1d772afc8e633ce95b988646bd9ed5df65cb33ec98a43b41e6cb6de5276ca9cce91d069dc688619f1a250842b37d380d4fb984c9f912a2f86edcf5dddba9',
  appName : 'vote.h5.app',
  callbackUrl : '#/return_url',
};

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

  getUserData(){
    if(!_user_data['PublicKey']){
      return null;
    }

    return _user_data;
  },
  setUserData(queryString){
    const tmp = JSON.parse(decodeURIComponent(queryString));
    const d = {
      Data : JSON.parse(tmp.Data),
      PublicKey : tmp.PublicKey,
      Sign : tmp.Sign
    };

    _.extend(_user_data, d);
  },

  getUrlParam(name){
    const t = location.hash.replace(_user_data.callbackUrl, '');
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = t.substr(1).match(reg);
    if (r) return unescape(r[2]);
    return null;
  },


  getRequestUserDataUrl(){
    const return_url = _user_data.callbackUrl;
    return `elaphant://identity?Description=rket&AppID=cc053c61afc22dda9a309e96943c1734&SerialNumber=368F42311054A0B1FF35EF08F274E917417132734461A84F0D48C8864E356D26&PublicKey=028971D6DA990971ABF7E8338FA1A81E1342D0E0FD8C4D2A4DF68F776CA66EA0B1&Signature=90E8A60DC055C90F4765E91B6E4F07031F55CF7DD2DA4EF1EF55EA41D160CB48879F62D70EC8ED090E4CBBE013D21E7580C36CFA2173A997ADADB7255B23098F&Amount=0.011200&PaymentAddress=EdBndwMd3WsgqKRoZMPyAG5r9jMw4wJrTK&DID=ihKwfxiFpYme8mb11roShjjpZcHt1Ru5VB&CoinName=ELA&RandomNumber=123456&AppName=cket&RequestInfo=btcaddress,ethaddress,email,phonenumber,randomnumber&ReturnUrl=${return_url}`;
  },

  buildVoteSchema(nodePublicKeyList){
    const d = _user_data;

    const to = _.map(nodePublicKeyList, (k)=>{
      return '"'+k+'"';
    }).join(',');

    const url = `elaphant://eladposvote?AppID=${d.appId}&PublicKey=${d.PublicKey}&Sign=${d.Sign}&DID=${d.Data.DID}&AppName=${d.appName}&ReturnUrl=/${d.callbackUrl}&CandidatePublicKeys=[${to}]`;

    console.log('vote schema => '+url);
    window.open(url);
    return url;
  }

}