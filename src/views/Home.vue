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
      active : ''
    }
  },
  computed: {
    // active(){
    //   return this.$store.state.current_tab;
    // }
  },
  watch: {
    active(val, oldVal){
      console.log(val, oldVal);
      this.$store.commit('set_tab', val);
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
  }
}
</script>

<style lang='scss'>
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
