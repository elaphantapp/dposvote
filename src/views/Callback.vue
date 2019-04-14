<template>
  
</template>
<script>
import util from '../util';
export default {
  mounted(){
    console.log('callback page');
    util.loading(true);

    const txid = util.getUrlParam('txid');
    console.log(11, txid);
    if(txid){
      // vote callback
      console.log('callback->txid : '+txid);
    }
  }
}
</script>

