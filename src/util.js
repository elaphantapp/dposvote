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


  transformUserData(str){
    str = str || '%7B%22Data%22%3A%22%7B%5C%22BTCAddress%5C%22%3A%5C%221PncAFvqJ3oxBEvwKZYUDhzsujMbQRhDLM%5C%22%2C%5C%22DID%5C%22%3A%5C%22iUTRuu8Pt9nMEmWVzKwD2DhhyQcPUbjVnp%5C%22%2C%5C%22ELAAddress%5C%22%3A%5C%22EcXKvdNaSYAhCw3ucZziTUND6h4LcBwxfE%5C%22%2C%5C%22EMail%5C%22%3A%5C%22%5C%22%2C%5C%22ETHAddress%5C%22%3A%5C%220x6001f701d41ac5D0fca3aE9a258982EB9888C37c%5C%22%2C%5C%22Nickname%5C%22%3A%5C%22low%E5%9B%BE%E5%90%90%E4%BA%86%5C%22%2C%5C%22PhoneNumber%5C%22%3A%5C%22%5C%22%2C%5C%22PublicKey%5C%22%3A%5C%22032a3cb74e66879690b6f5bb41e032451bc7abe5ee3b72955f754b25e44dbfce73%5C%22%2C%5C%22RandomNumber%5C%22%3A%5C%22123456%5C%22%7D%22%2C%22PublicKey%22%3A%22032a3cb74e66879690b6f5bb41e032451bc7abe5ee3b72955f754b25e44dbfce73%22%2C%22Sign%22%3A%22aa9dd89cb96a0c10db0b621d6dcf8e0e8b2c6455a754190258513b28cd93c8ff224c3a81748e30a6357181ed111da3ed318bec30815572d2a1f0e7682b06b6d9%22%7D';

    const tmp = JSON.parse(decodeURIComponent(str));
    return {
      Data : JSON.parse(tmp.Data),
      PublicKey : tmp.PublicKey,
      Sign : tmp.Sign
    }
  },

  getRequestUserDataUrl(){
    const CallbackUrl = '/';
    return `elaphant://identity?CallbackUrl=http://localhost:8081/packet/grab/1509893100600982-0&Description=rket&AppID=cc053c61afc22dda9a309e96943c1734&SerialNumber=368F42311054A0B1FF35EF08F274E917417132734461A84F0D48C8864E356D26&PublicKey=028971D6DA990971ABF7E8338FA1A81E1342D0E0FD8C4D2A4DF68F776CA66EA0B1&Signature=90E8A60DC055C90F4765E91B6E4F07031F55CF7DD2DA4EF1EF55EA41D160CB48879F62D70EC8ED090E4CBBE013D21E7580C36CFA2173A997ADADB7255B23098F&Amount=0.011200&PaymentAddress=EdBndwMd3WsgqKRoZMPyAG5r9jMw4wJrTK&DID=ihKwfxiFpYme8mb11roShjjpZcHt1Ru5VB&CoinName=ELA&RandomNumber=123456&AppName=cket&RequestInfo=btcaddress,ethaddress,email,phonenumber,randomnumber&ReturnUrl=${CallbackUrl}`;
  }

}