<template>
  <div class="p-app">

    
    <mt-tab-container :swipeable="false" v-model="active">
      <mt-tab-container-item id="tab1">
        <Nodes />
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <MyFav />
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
        <MyVotes />
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="active" v-if="tab_show">
      <mt-tab-item id="tab1">
        <i class="iconfont icon-nodes"></i>
        <p>{{$t('NODES')}}</p>
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <i class="iconfont icon-fav"></i>
        <p>{{$t('FAVORITES')}}</p> 
      </mt-tab-item>
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
      console.log('set_tab', val, oldVal);
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
        const fakeQueryString = '%7B%22Data%22%3A%22%7B%5C%22BTCAddress%5C%22%3A%5C%221PncAFvqJ3oxBEvwKZYUDhzsujMbQRhDLM%5C%22%2C%5C%22DID%5C%22%3A%5C%22iUTRuu8Pt9nMEmWVzKwD2DhhyQcPUbjVnp%5C%22%2C%5C%22ELAAddress%5C%22%3A%5C%22ENaaqePNBtrZsNbs9uc35CPqTbvn8oaYL9%5C%22%2C%5C%22EMail%5C%22%3A%5C%22%5C%22%2C%5C%22ETHAddress%5C%22%3A%5C%220x6001f701d41ac5D0fca3aE9a258982EB9888C37c%5C%22%2C%5C%22Nickname%5C%22%3A%5C%22low%E5%9B%BE%E5%90%90%E4%BA%86%5C%22%2C%5C%22PhoneNumber%5C%22%3A%5C%22%5C%22%2C%5C%22PublicKey%5C%22%3A%5C%22032a3cb74e66879690b6f5bb41e032451bc7abe5ee3b72955f754b25e44dbfce73%5C%22%2C%5C%22RandomNumber%5C%22%3A%5C%22123456%5C%22%7D%22%2C%22PublicKey%22%3A%22032a3cb74e66879690b6f5bb41e032451bc7abe5ee3b72955f754b25e44dbfce73%22%2C%22Sign%22%3A%22aa9dd89cb96a0c10db0b621d6dcf8e0e8b2c6455a754190258513b28cd93c8ff224c3a81748e30a6357181ed111da3ed318bec30815572d2a1f0e7682b06b6d9%22%7D';
        util.setUserData(fakeQueryString);
        this.$store.dispatch('set_me_info', {});
      }
      else{
        // this.popupVisible = true;
        this.requestUserData();
      }
      
      
      
      

    }
    else{
      console.log('user data: ', ud);
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
