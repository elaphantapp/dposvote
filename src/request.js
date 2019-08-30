import axios from 'axios';


const _axios = axios.create({
    baseURL: 'https://node1.elaphant.app/api/1',
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
        return _axios.get('/dpos/vote/height/' + height + '?state=active');
    },

    getElaByAddress(address) {
        return _axios.get('/balance/' + address);
    },

    getVoteByAddress(address, pageSize, pageNum) {
        return _axios.get('/dpos/address/' + address + '?pageSize=' + pageSize + '&pageNum=' + pageNum);
    }
};


export default F;