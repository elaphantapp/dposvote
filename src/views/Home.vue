<template>
  <div class="p-app">

    
    <mt-tab-container :swipeable="false" v-model="active">
      <mt-tab-container-item id="tab1">
        <Nodes />
      </mt-tab-container-item>
       <!-- <mt-tab-container-item id="tab2">
        <MyFav />
      </mt-tab-container-item> -->
      <mt-tab-container-item id="tab3">
        <MyVotes />
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="active" v-if="tab_show">
      <mt-tab-item id="tab1">
        <i class="iconfont icon-nodes"></i>
        <p>{{$t('NODES')}}</p>
      </mt-tab-item>
       <!-- <mt-tab-item id="tab2">
        <i class="iconfont icon-fav"></i>
        <p>{{$t('FAVORITES')}}</p> 
      </mt-tab-item> -->  
      <mt-tab-item id="tab3">
        <i class="iconfont icon-vote"></i>
        <p>{{$t('MY_VOTES')}}</p> 
      </mt-tab-item>

    </mt-tabbar>
    

    <mt-popup
      v-model="popupVisible"
      position="right"
      class="login-popup"
      :modal="true"
      popup-transition="popup-fade">
      <div class="v-btn">
        <mt-button size="large" class="cb" type="primary" @click="requestUserData()">用户登录</mt-button>
      </div>
    </mt-popup>


    <router-view/>
  </div>
</template>

<script>
import Nodes from './Nodes';
import MyVotes from './MyVotes';
import MyFav from './MyFav';
import util from '@/util';
export default {
  name: 'home',
  data(){
    return {
      tab_show : true,
      active : '',
      popupVisible : false
    }
  },
  computed: {
    // active(){
    //   return this.$store.state.current_tab;
    // }
  },
  watch: {
    active(val, oldVal){
      this.$store.commit('set_tab', val);
      util.publish('set_tab', val);
    }
  },
  components: {
    Nodes,
    MyVotes,
    MyFav
  },
  created(){
    util.register('home-tab', (key, flag)=>{
      
      this.tab_show = !!flag;
    })
  },
  mounted(){
    // console.log(111);
    this.active = this.$store.state.current_tab;

    const ud = util.getUserData();
    if(!ud){
      // request user data;

      if(util.isChrome()){
        const fakeQueryString = '#/return_url?Data=%7B%0A%20%20%22RandomNumber%22%20:%20%22998877%22,%0A%20%20%22PublicKey%22%20:%20%2203f27136e4c545e8021bd2ab86dda46143734df386355d4df921fe74c3a4a22711%22,%0A%20%20%22ELAAddress%22%20:%20%22ESV4kMRAiKpLMWMXcqAysFwPhQ3aSzQTzh%22,%0A%20%20%22DID%22%20:%20%22igGsfGmYiAkTcPju5wPzMniYZkj1F5xYSc%22%0A%7D&Sign=64B7408241D90655D14D4DF853E6C14A632056BF5B916BEBA7B09E7737655E0AF4BC84BB90D53B2EDE1FF903A5BD2EF361FDA9637B35337481CF8C252255D0BB';
        util.setUserData(fakeQueryString);
      
        //this.$store.dispatch('set_me_info', {});
      }
      else{
        // this.popupVisible = true;
        this.requestUserData();
      }
      
      
      
      

    }
  },
  methods: {
    requestUserData(){
      util.buildRequestUserDataUrl();
    }
  }
}
</script>

<style lang='scss'>
.login-popup{
  width: 100%;
  height: 100%;
  // position: fixed;
  // top: 0 !important;
  left: 0 !important;
  background: rgba(255,255,255,0.7) !important;

  .v-btn{
    margin-top: 100px;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }
}
.p-app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  i.iconfont{
    display: block;
    font-size: 24px;
    margin-top: 8px;
    color: #9c9c9c;
  }

  .c-hide{
    opacity: 0 !important;
  }

  p{
    font-size: 14px;
    line-height: normal;

    color: #9c9c9c;
  }

  .is-selected{
    background-color: none;
    i.iconfont{
      color: $blue_color;
    }

    p{
      
      color: $blue_color;
    }
  }
}
</style>
