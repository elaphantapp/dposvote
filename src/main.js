import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import VueI18n from 'vue-i18n'
import language from './i18n';

import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css';

import './assets/index.css';
import './style.scss';

Vue.use(VueI18n)
Vue.use(MintUI);
Vue.config.productionTip = false;

const dl = navigator.language === 'zh-CN' ? 'zh' : 'en';

const i18n = new VueI18n({
    locale: dl,
    messages: language
})

// temp change language method
window.changeLanguage = (lang = 'en') => {
    i18n.locale = lang;
}

Vue.filter('toF2', (v, xx) => {
    var x = v || 0.00;
    //return ((Math.round(x * 100)) / 100).toFixed(2) + (xx || '');
    return parseFloat(x).toFixed(2) + (xx || '');
})

Number.prototype.toFixed = function(len) {
    if (len > 20 || len < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    // .123转为0.123
    var number = Number(this);
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }
    if (typeof(len) == 'undefined' || len == 0) {
        return (Math.round(number)).toString();
    }
    var result = number.toString(),
        numberArr = result.split('.');

    if (numberArr.length < 2) {
        //整数的情况
        return padNum(result);
    }
    var intNum = numberArr[0], //整数部分
        deciNum = numberArr[1], //小数部分
        lastNum = deciNum.substr(len, 1); //最后一个数字

    if (deciNum.length == len) {
        //需要截取的长度等于当前长度
        return result;
    }
    if (deciNum.length < len) {
        //需要截取的长度大于当前长度 1.3.toFixed(2)
        return padNum(result)
    }
    //需要截取的长度小于当前长度，需要判断最后一位数字
    result = intNum + '.' + deciNum.substr(0, len);
    if (parseInt(lastNum, 10) >= 5) {
        //最后一位数字大于5，要进位
        var times = Math.pow(10, len); //需要放大的倍数
        var changedInt = Number(result.replace('.', '')); //截取后转为整数
        changedInt++; //整数进位
        changedInt /= times; //整数转为小数，注：有可能还是整数
        result = padNum(changedInt + '');
    }
    return result;
    //对数字末尾加0
    function padNum(num) {
        var dotPos = num.indexOf('.');
        if (dotPos === -1) {
            //整数的情况
            num += '.';
            for (var i = 0; i < len; i++) {
                num += '0';
            }
            return num;
        } else {
            //小数的情况
            var need = len - (num.length - dotPos - 1);
            for (var j = 0; j < need; j++) {
                num += '0';
            }
            return num;
        }
    }
}


export const vue = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')