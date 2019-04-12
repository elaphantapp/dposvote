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
          <p class="p2">{{node_detail.State}}</p>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-70px -141px;"></div>
          <p class="p1">{{$t('RANK')}}</p>
          <p class="p2">{{node_detail.Rank}}</p>
        </div>
        <div class="c-item">
          <div class="c-icon kg-png" style="background-position:-97px -141px;"></div>
          <p class="p1">{{$t('VOTES')}} %</p>
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
          <p class="p1">Public key</p>
          <p class="p2">
            <span id="id_copy_text" style="max-width:62%;text-overflow:ellipsis;overflow:hidden;float:left;">{{node_detail.Producer_public_key}}</span>
            <i class="c-copy kg-png btn" :data-clipboard-text="node_detail.Producer_public_key" style="background-position:-228px -142px;float:left"></i>
          </p>
        </div>

      </div>

      <div style="background:#fff;padding:0 15px;margin-top:10px; padding-bottom: 60px;" v-if="!!node_detail">
        <div class="c-item" v-for="(v, k) in node_detail.votes_gap" v-bind:key="k">
          <div class="c-icon kg-png" style="background-position:-201px -140px;height:16px;"></div>
          <p class="p1">Votes gap VS No.{{k}}</p>
          <p class="p2">{{v}} ELA votes</p>
        </div>
      </div>
      
    </div>

    <div class="v-btn">
      <mt-button @click="clickVoteBtn()" size="large" class="cb" type="primary">
        {{$t('VOTE')}}
      </mt-button>
    </div>

    

  </div>
</template>
<script>
import util from '@/util';
import ClipboardJS from 'clipboard';

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
        return this.$store.state.node_detail;
      }

      // util.loading(true);
      return null;
    }
  },
  mounted(){
    const param = this.$router.history.current.params.id;
    this.$store.dispatch('set_node_detail', param);
  },
  methods: {
    clickVoteBtn(){
      util.toastSuccess('click vote button');
    }
  },
  created(){
    tmp = new ClipboardJS('.c-copy');
    tmp.on('success', function(e) {
      util.toastInfo('copy successs');
      console.log('copy text : '+ e.text);
      e.clearSelection();
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
    bottom: 20px;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }
}
</style>


