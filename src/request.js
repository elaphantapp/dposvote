import axios from 'axios';

const _axios = axios.create({
  baseURL: 'https://123.206.52.29/api/dposnoderpc',

});

const F = {
  listproducer(){
    return _axios.post('/check/listproducer', {});
  }
};


export default F;