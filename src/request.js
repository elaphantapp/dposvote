import axios from 'axios';


const _axios = axios.create({
    baseURL: 'https://api-wallet-ela.elastos.org/api/1',
    // baseURL: '/api/1',

});

_axios.interceptors.response.use((res) => {
    if (res.data) {
        return Promise.resolve(res.data);
    }
}, (error) => {
    return Promise.reject(error);
});

const F = {
    getNodeList(height) {
        return _axios.get('/dpos/rank/height/' + height);
    },

    getCurrentBlockHeight() {
        return _axios.get('/currHeight');
    },

    getNodeInfoByAddress(address) {
        return _axios.get('/dpos/address/' + address);
    },

    getTotalVotes(height) {
        return _axios.get('/dpos/vote/height/' + height);
    },

    getElaByAddress(address) {
        return _axios.get('/balance/' + address);
    },

    getVoteByAddress(address) {
        return _axios.get('/dpos/address/' + address);
    }
};


export default F;