import { Indicator } from 'mint-ui';
import _ from 'lodash';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { Toast } from 'mint-ui';
const config = {
    appId: '552453550a0ad3ad6cedd21a7bd47d2a3049ebb17099e892d92b93f9bd72bdeed9a439806118358422f3cb957a1ddebdc768ff667c2bd7359063d79d1618bf9c',
    appName: 'dposvote.h5.app',
    appDid: 'iiJRtAn6wyHaMSDQPS9Kkft3iiNjH5tTmi',
    appDidPublicKey: '02752F9483DF73C57EDEA1F84F2431DC1036B2643F9519E78CB660D8C332793EDC',
    callbackUrl: 'https://dposvote.elaphant.app/#/return_url',
    random: '998877'
};
const _user_data = {
    ...config
};



const isChrome = () => {
    const ua = navigator.userAgent.toLowerCase()
    return ua.indexOf('chrome') !== -1 && ua.indexOf('android') === -1;
}

const isSafari = () => {

    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}

const isIos = () => {
    const ua = navigator.userAgent.toLowerCase();
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

const getUrlParam = (name, url) => {
    url = url || location.hash;
    const t = url.replace('#/return_url', '').replace(/%09/g, '');
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = decodeURIComponent(t).substr(1).match(reg);
    if (r) return unescape(r[2]);
    return null;
}

const isPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

const isWechat = () => {
    var ua = navigator.userAgent.toLowerCase();
    return /micromessenger/i.test(ua) || typeof navigator.wxuserAgent !== 'undefined';
}


const _cache = {};
const rc = {
    set(key, rs) {
        const data = {
            data: rs,
            t: Date.now()
        }
        _.set(_cache, key, data);
    },
    get(key) {
        const rs = _.get(_cache, key, null);
        if (!rs) return null;
        const data = rs.data;
        if (Date.now() - rs.t > 1000 * 60 * 30) {
            return null;
        }

        return data;
    }
};

const ls = {
    set(key, value) {
        const d = {
            data: value,
            t: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(d));
    },
    get(key) {
        const rs = localStorage.getItem(key);
        if (!rs) return null;
        const json = JSON.parse(rs);
        return json.data;
    }
};
window._cache = _cache;
window._user_data = _user_data;
export default {
    _,
    moment,
    rc,
    ls,
    isChrome,
    isIos,
    isSafari,
    isPC,
    isWechat,
    loading(flag = false) {
        if (flag) {
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            _.delay(() => {
                Indicator.close();
            }, 2000);
        } else {
            Indicator.close();
        }
    },

    request(mockResult = {}) {
        return new Promise((resolve) => {
            _.delay(() => {
                resolve(mockResult);
            }, 1000)
        })

    },

    register: PubSub.subscribe,
    publish: PubSub.publish,

    toastSuccess(msg) {
        Toast({
            message: msg,
            className: 'kg-toast',
            iconClass: 'fa fa-check'
        });
    },

    toastInfo(msg) {
        Toast({
            message: msg,
            className: 'kg-toast',
            position: 'bottom',
            duration: 3000
        });
    },

    getConfig() {
        return config;
    },
    getUserData() {
        // const d = ls.get('user-data');
        const d = _user_data;
        if (!d || !d['Sign']) {
            return null;
        }

        return d;
    },
    setUserData(queryString) {
        queryString = queryString || location.hash;

        const Data = getUrlParam('Data', queryString);

        const tmp = JSON.parse(decodeURIComponent(Data));
        localStorage.setItem("dops-did", tmp.DID);
        tmp.Sign = getUrlParam('Sign', queryString);

        const d = {
            Data: tmp,
            PublicKey: tmp.PublicKey,
            Sign: tmp.Sign
        };
        _.extend(_user_data, d);
    },

    getUrlParam,


    buildRequestUserDataUrl() {
        const d = _user_data;

        const rt = encodeURIComponent(d.callbackUrl);
        let url = `elaphant://identity?ReturnUrl=${rt}&AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&DID=${d.appDid}&RandomNumber=${d.random}&AppName=${d.appName}&RequestInfo=elaaddress`;
        if (isPC() || isWechat()) {
            let callUrl = "https://launch.elaphant.app?appName=dposvote&appTitle=dposvote&autoRedirect=True&redirectURL=" + encodeURIComponent(url);
            location.href = callUrl;
        } else {
            location.href = url;
        }

        return url;
    },

    buildVoteSchema(nodePublicKeyList) {
        const d = _user_data;

        const to = _.map(nodePublicKeyList, (k) => {
            return k;
        }).join(',');

        const rt = encodeURIComponent(d.callbackUrl);
        const pp = (`${to}`);
        let url = `elaphant://eladposvote?AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&DID=${d.appDid}&AppName=${d.appName}&ReturnUrl=${rt}&CandidatePublicKeys=${pp}`;

        if (isPC() || isWechat()) {
            let callUrl = "https://launch.elaphant.app?appName=dposvote&appTitle=dposvote&autoRedirect=True&redirectURL=" + encodeURIComponent(url);
            location.href = callUrl;
        } else {
            location.href = url;
        }
        return url;
    },


    buildRevokeVoteSchema() {
        const d = _user_data;



        const rt = encodeURIComponent(d.callbackUrl);
        let url = `elaphant://eladposvote?AppID=${d.appId}&PublicKey=${d.appDidPublicKey}&DID=${d.appDid}&AppName=${d.appName}&ReturnUrl=${rt}`;

        if (isPC() || isWechat()) {
            let callUrl = "https://launch.elaphant.app?appName=dposvote&appTitle=dposvote&autoRedirect=True&redirectURL=" + encodeURIComponent(url);
            location.href = callUrl;
        } else {
            location.href = url;
        }

        return url;
    },

    handleNodeList(nodeList) {
        var arr = [];
        var rank = 1;
        for (var index = 0; index < nodeList.length; index++) {
            var item = nodeList[index];
            if (item["State"] === "pending" || item["State"] === "Activate" || item["State"] === "Active" || item["State"] === "active") {
                var location = item["Location"].toString();
                if (location.substring(0, 2) === "00") {
                    item["Location"] = parseInt(location.substring(2));
                }
                item['imgLogo'] = "";
                item['Rank'] = rank;
                rank = rank + 1;
                arr.push(item);
            }
        }
        return arr;
    }
}