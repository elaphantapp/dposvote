<template>
  <div class="kg-page p-myVoteDetail">
    <mt-header title="Detail">
      <router-link to="" slot="left">
        <mt-button @click.native="$router.back(-1)" icon="back"></mt-button>
      </router-link>
      
    </mt-header>

    <div class="kg-body" v-if="data">
      <div class="c-top">
        <div class="c1">
          <p class="p1">{{$t('VOTES')}}: (ELA)</p>
          <p class="p2">{{data.number}}</p>
        </div>
        <div class="c1">
          <p class="p1">{{$t('NODES')}}</p>
          <p class="p2">{{data.node}}</p>
        </div>
      </div>

      <div class="c-mid">
        <div class="kg-png"></div>
        <span class="s1">{{data.time}}</span>
        <span class="s2">{{data.status}}</span>
      </div>

      <div class="c-list" style="margin-top: 8px; padding-bottom: 60px;">
        <VotingListItem 
          v-for="(item, i) in data.node_list" v-bind:key="i" 
          v-bind:status="vote_status"
          v-bind:clickFn="clickItem"
          v-bind:item="item" 
          v-bind:index="i+1">
        
        </VotingListItem>
      </div>

    </div>

    <div class="v-btn">
      <mt-button v-if="vote_status==='list'" @click="clickVoteBtn1()" size="large" class="cb" type="primary">
        Re-Vote
      </mt-button>
      <mt-button v-if="vote_status==='vote'" @click="clickVoteBtn2()" :disabled="select.n<1" size="large" class="cb" type="primary">
        Vote <span style="font-size: 12px;">{{`(${select.n}/${select.t})`}}</span>
      </mt-button>
    </div>



  </div>
</template>
<script>
import util from '@/util';
import VotingListItem from '../components/VotingListItem';
export default {
  components : {
    VotingListItem
  },

  data(){
    return {
      vote_status : 'list',
      select : {
        n : 0,
        t : 0
      }
    };
  },

  computed: {
    data(){
      if(this.$store.state.my_vote_detail){
        util.loading(false);
        this.$store.state.my_vote_detail.time = util.moment(this.$store.state.my_vote_detail.time).format('YYYY-MM-DD hh:mm');
        return this.$store.state.my_vote_detail;
      }

      util.loading(true);
      return null;
    }
  },
  mounted(){
    this.$store.dispatch('set_my_vote_detail', {});
  },
  methods: {
    clickItem(item){
      if(this.vote_status === 'list'){
        this.$router.push('/node_detail/'+item.id);
      }
      else{
        // vote
        item.selected = !item.selected;
        this.processSelectNumber();
      }
    },
    clickVoteBtn1(){
      this.vote_status = 'vote';
      this.processSelectNumber();
    },
    clickVoteBtn2(){
      util.toastSuccess('click vote btn');

      util._.delay(()=>{
        this.vote_status = 'list';
      }, 3000);
      
    },
    processSelectNumber(){
      const t = util._.size(this.data.node_list);
      const n = util._.size(util._.filter(this.data.node_list, (item)=>{
        return item.selected;
      }));

      this.select = {
        t, n
      };
    },
  }
}
</script>
<style lang="scss">
.p-myVoteDetail{
  .c-top{
    background: #fff;
    padding: 24px 0 24px;
    display: flex;
    flex-direction: row;
    position: relative;
    box-shadow: 0 2px 4px #d9d9d9;

    &::after{
      content: '';
      position: absolute;
      border-top: 7px solid #fff;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      top: 100%;
      left: calc(50% - 4px);
    }

    .c1{
      flex-grow: 1;

      .p1{
        font-size: 14px;
        color: #b2b2b2;
      }
      .p2{
        font-size: 24px;
        font-weight: 600;
        margin-top: 8px;
      }
    }
  }
  .c-mid{
    margin-top: 10px;
    padding: 0 15px;
    position: relative;
    height: 24px;
    .kg-png{
      width: 12px;
      height: 12px;
      position: absolute;
      background-position: -67px -232px;
      left: 15px;
      top: 6px;
    }
    .s1{
      color: #888;
      font-size: 13px;
      position:absolute;
      top: 1px;
      left: 32px;
    }
    .s2{
      position:absolute;
      color: #888;
      font-size: 13px;
      right: 15px;
      top: 1px;
    }
  }

  .v-btn{
    position: absolute;
    bottom: 20px;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }
}
</style>

