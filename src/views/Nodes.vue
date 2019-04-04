<template>
  <div class="p-nodes kg-page">
    <!-- <mt-header :title="$t('VOTING')"></mt-header> -->

    <div class="kg-body kg-tab">
      <mt-search :value.sync="value" 
        cancel-text="Cancel"
        placeholder="serach..."
        style="height:auto;" />

      <div class="c-filter">
        <div class="c-e" @click="clickFilter(1)" :class="filter_active==1?'active':''">
          <p>{{$t('RANK')}}</p>
        </div>
        <div class="c-e" @click="clickFilter(2)" :class="filter_active==2?'active':''">
          <p>{{$t('FAV')}}</p>
        </div>
        <div class="c-e" @click="clickFilter(3)" :class="filter_active==3?'active':''">
          <p>{{$t('LATEST')}}</p>
        </div>
        <div class="c-e" @click="clickFilter(4)" :class="filter_active==4?'active':''">
          <p>A-Z</p>
        </div>
      </div>

      <div class="c-list">
        <VotingListItem
          v-for="(item, i) in list" v-bind:key="i" 
          v-bind:status="vote_status"
          v-bind:clickFn="clickItem"
          v-bind:item="item" 
          v-bind:index="i+1">
        </VotingListItem>
      </div>
      
    </div>

    <div class="x-btn" @click="toggleListStatus()">
      <div class="kg-png" slot="icon"></div>
    </div>

    <div class="v-btn">
      <mt-button @click="clickVoteBtn()" :disabled="select.n<1" size="large" class="cb" type="primary">
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
      value : '',
      filter_active : 1,
      vote_status : 'list',

      select : {
        n : 0,
        t : 0
      }
    }
  },
  methods : {
    clickFilter(index){
      this.filter_active = index;
      //TODO
      this.$store.dispatch('set_node_list', {filter: index});
    },

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

    toggleListStatus(){
      this.vote_status = this.vote_status === 'list' ? 'vote' : 'list';
      util.publish('home-tab', this.vote_status==='list');

      if(this.vote_status === 'vote'){
        this.processSelectNumber();
      }
    },

    processSelectNumber(){
      const t = util._.size(this.list);
      const n = util._.size(util._.filter(this.list, (item)=>{
        return item.selected;
      }));

      this.select = {
        t, n
      };
    },

    clickVoteBtn(){
      alert('click vote button');
    }
  },

  computed: {
    list(){
      if(this.$store.state.node_list){
        util.loading(false);
        return this.$store.state.node_list;
      }

      util.loading(true);
      return [];
    }
  },

  mounted(){
    this.$store.dispatch('set_node_list', {});
  }
}
</script>

<style lang="scss">
.p-nodes{
  .c-filter{
    margin-top: 12px;
    width: 100%;
   
    display: flex;
    flex-direction: row;

    .c-e{
      width: 25%;
      text-align: center;
      p{
        width: 70%;
        margin: 0 auto;
        padding: 2px 0;
        border-radius: 4px;
        background: rgb(232, 233, 242);
        font-size: 14px;
        color: #9c9c9c;
      }

      &.active{
        p{
          border: 1px solid rgb(172, 178, 244);
        }
      }
    }
  }

  .c-list{
    margin-top: 12px;
  }

  .x-btn{
    position: absolute;
    right: 20px;
    z-index: 99;
    bottom: 20px;
    padding: 0;

    .kg-png{
      width: 44px;
      height: 44px;
      background-position: -202px -42px;
      border-radius: 22px;
      box-shadow: 0 3px 6px $blue_color;
    }
  }
  .v-btn{
    position: absolute;
    bottom: -38px;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }
}
</style>


