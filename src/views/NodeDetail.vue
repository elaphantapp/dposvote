<template>
  <div class="kg-page p-NodeDetail">
    <!-- <mt-header :title="$t('NODE_DETAILS')">
      <router-link to="" slot="left">
        <mt-button @click.native="$router.back(-1)" icon="back"></mt-button>
      </router-link>
      
    </mt-header> -->

    <div class="kg-body">
      <div style="background:#fff;padding:0 15px;" v-if="!!node_detail">
        
        <div class="c-head">
          <img src="../assets/avatar.png" />
          <span>{{node_detail.Nickname}}</span>
          <i class="fa fa-star" :class="{'active':node_detail.fav}"></i>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-45px -141px;"></div>
          <p class="p1">{{$t('STATUS')}}</p>
          <p class="p2">{{$t(node_detail.State)}}</p>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-70px -141px;"></div>
          <p class="p1">{{$t('RANK')}}</p>
          <p class="p2">{{node_detail.Rank}}</p>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-97px -141px;"></div>
          <p class="p1">{{$t('03')}}</p>
          <p class="p2">{{node_detail.Percentage}}%</p>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-123px -140px; height:16px;"></div>
          <p class="p1">{{$t('LOCATION')}}</p>
          <p class="p2">{{$t('country')[node_detail.Location]}}</p>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-149px -140px;width:16px;height:16px;"></div>
          <p class="p1">URL</p>
          <p class="p2">{{node_detail.Url}}</p>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-175px -140px;height:16px;"></div>
          <p class="p1">{{$t('PUBLIC_KEY')}}</p>
          <p class="p2">
            <span id="id_copy_text" style="max-width:62%;text-overflow:ellipsis;overflow:hidden;float:left;">{{node_detail.Producer_public_key}}</span>
  
            <button class="c-copy kg-png btn" :data-clipboard-text="node_detail.Producer_public_key" style="background-position:-228px -142px; float:left; border:none;"></button>
          </p>
        </div>

      </div>

      <div style="background:#fff;padding:0 15px;margin-top:10px; padding-bottom: 0px;" v-if="votes_gap">
        <div class="c-item" v-for="(v, k) in votes_gap" v-bind:key="k">
          <div class="c-icon kg-png" style="background-position:-201px -140px;height:16px;"></div>
          <p class="p1">{{$t('04')}} VS No.{{k}}</p>
          <p class="p2">{{v}} ELA {{$t('01')}}</p>
        </div>
      </div>
      
    </div>

    <!-- <div class="v-btn">
      <mt-button @click="clickVoteBtn()" size="large" class="cb" type="primary">
        {{$t('02')}}
      </mt-button>
    </div> -->

    

  </div>
</template>
<script>
import util from '@/util';
import ClipboardJS from 'clipboard';
import {vue} from '../main';

let tmp = null;
export default {
  data(){
    return {
      
    };
  },
  computed: {
    node_detail(){
      if(this.$store.state.node_detail){
        // util.loading(false);
        // console.log(111, this.$store.state.node_detail)
        return this.$store.state.node_detail;
      }

      // util.loading(true);
      return null;
    },
    votes_gap(){
      let rs = {
        '24' : 'NA',
        '96' : 'NA'
      };
      const detail = this.$store.state.node_detail;
      const list = this.$store.state.node_list;
      if(detail && list){
        // console.log(111, list, detail);
        // rank 24
        const s24 = util._.find(list, (item)=>{return item.Rank===24;});
        if(s24){
          rs['24'] = (detail.Value||0) - (s24.Value || 0);
          
        }

        // rank 96
        const s96 = util._.find(list, (item)=>{return item.Rank===96;});
        if(s96){
          rs['96'] = (detail.Value||0) - (s96.Value || 0);
        }
      }

      return rs;
    }
  },
  mounted(){
    const param = this.$router.history.current.params.id;
    if(param){
      this.$store.dispatch('set_node_detail', param);
    }
    
  },
  methods: {
    clickVoteBtn(){
      const url = util.buildVoteSchema([this.node_detail.Producer_public_key]);
    }
  },
  created(){

    tmp = new ClipboardJS('.c-copy');
    
    tmp.on('success', function(e) {
      util.toastInfo(vue.$t('05'));
      console.log('copy text : '+ e.text);
      e.clearSelection();
    });
    tmp.on('error', function(e) {
      util.toastInfo('copy error');
    });
  },
  destroyed(){
    if(tmp){
      tmp.destroy();
      tmp = null;
    }
  }
}
</script>
<style lang="scss">
.p-NodeDetail{
  .c-head{
    height: 40px;
    position: relative;

    img{
      width: 24px;
      height: 24px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 8px;
    }
    span{
      font-size: 17px;
      position: absolute;
      top: 8px;
      left: 32px;
      font-weight: 600;
      color: #333;
    }
    i{
      position: absolute;
      right: 0;
      top: 12px;
      color: $light_color;

      &.active{
        color: $blue_color;
      }
    }
  }
  .c-item{
    height: 72px;
    position: relative;
    border-bottom: 1px solid #f3f3f3;
    .c-icon{
      width: 15px;
      height: 15px;
      position: absolute;
      top: 18px;
      left: 5px;
    }
    .c-copy{
      width: 15px;
      height: 15px;
      display: inline-block;
      position: relative;
      top: 4px;
      left: 10px;
    }
    .p1{
      font-size: 15px;
      color: #333;
      position: absolute;
      left: 32px;
      top: 14px;
      font-weight: 600;
    }
    .p2{
      color: #888;
      position: absolute;
      left: 32px;
      font-size: 13px;
      top: 38px;
    }
  }

  .v-btn{
    position: fixed;
    bottom: 56px;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }
}
</style>


