<template>
  
</template>
<script>
import util from '../util';
export default {
  mounted(){
    // util.toastInfo('return page')
    console.log('callback page');
    util.loading(true);

    const config = util.getConfig();

    const txid = util.getUrlParam('txid');
    const response = util.getUrlParam('response');
    console.log(11, txid, response);
    
    if(txid){
      // vote callback
      console.log('callback->txid : '+txid);
      util.toastInfo(this.$t('SUCCESS'));
      this.$router.replace('/');
    }
    else if(response){
      const queryString = response;
      console.log((queryString).replace(/\n| /g, ''))
      util.setUserData(queryString);
      // this.$store.dispatch('set_me_info', {});

      this.$router.replace('/');
    }
  }
}
</script>

