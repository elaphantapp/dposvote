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
      let curdid = JSON.parse(decodeURIComponent(response))["DID"];
      let olddid =  localStorage.getItem("dops-did") || "";
      if(olddid!=""&&curdid!=olddid){
           localStorage.setItem("dopsvote-"+curdid+"-login","");
      }else{
           localStorage.setItem("dopsvote-"+curdid+"-login","test");
      }
      util.setUserData();
      this.$router.replace('/');
    }
  }
}
</script>

