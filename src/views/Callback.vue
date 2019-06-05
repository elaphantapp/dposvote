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

    const txid = util.getUrlParam('TXID');
    const response = util.getUrlParam('Data');
    console.log(11, txid, response);
    
    if(txid){
      // vote callback
      console.log('callback->txid : '+txid);
      util.toastInfo(this.$t('SUCCESS'));
      this.$router.replace('/');
    }
    else if(response){
      util.setUserData();
      this.$router.replace('/');
    }
  }
}
</script>

