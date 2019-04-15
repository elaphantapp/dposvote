<template>
  
</template>
<script>
import util from '../util';
export default {
  mounted(){
    console.log('callback page');
    util.loading(true);

    const config = util.getConfig();

    const txid = util.getUrlParam('txid');
    const random = util.getUrlParam('RandomNumber');
    console.log(11, txid, random);
    
    if(txid){
      // vote callback
      console.log('callback->txid : '+txid);
      this.$router.replace('/');
    }
    else if(random === config.random){
      const queryString = util.getUrlParam('response');
      console.log((queryString).replace(/\n| /g, ''))
      util.setUserData(queryString);
      this.$store.dispatch('set_me_info', {});

      this.$router.replace('/');
    }
  }
}
</script>

