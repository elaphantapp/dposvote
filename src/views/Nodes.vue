<template>
  <div class="p-nodes kg-page">
    <!-- <mt-header :title="$t('VOTING')"></mt-header> -->

    <div class="kg-body kg-tab">
      <mt-search v-model="value" 
        :cancel-text="$t('CANCEL')"
        :placeholder="$t('SEARCH')"
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

      <mt-loadmore :top-method="loadTop" 
        :autoFill="false" 
        @top-status-change="handleTopChange"
        ref="loadmore"
        topPullText="Refresh"
        topDropText="Refresh"
        topLoadingText="Loading..."
        :top-status.sync="topStatus">
        <div class="c-list">
          <VotingListItem
            v-for="(item, i) in list" v-bind:key="i" 
            v-bind:status="vote_status"
            v-bind:clickFn="clickItem"
            v-bind:favFn="favItem"
            v-bind:item="item" 
            v-bind:index="i+1">
          </VotingListItem>
        </div>
        <!-- <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div> -->
      </mt-loadmore>

      
      
    </div>

    <div class="x-btn" @click="toggleListStatus()">
      <div class="kg-png" slot="icon"></div>
    </div>

    <div class="v-btn" v-if="vote_status==='vote'">
      <mt-button @click="clickVoteBtn()" :disabled="select.n<1 || select.n>36" size="large" class="cb" type="primary">
        {{$t('02')}} <span style="font-size: 12px;">{{`(${select.n}/${select.t})`}}</span>
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
      vote_status : 'list',
      topStatus : '',

      fn : {
        search_debounce : null
      },

      select : {
        n : 0,
        t : 0
      }
    }
  },
  methods : {
    async loadTop(a, b, c){
      await this.$store.dispatch('set_node_list', {});
      util._.delay(()=>{
        this.$refs.loadmore.onTopLoaded();
      }, 500);
      
    },
    handleTopChange(status) {
      this.topStatus = status;

    },
    clickFilter(index){
      
      this.$store.commit('set_node_page_filter', index);
      this.$store.dispatch('set_node_list', {});
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
    favItem(item){
      if(item.fav){
        this.$store.dispatch('removeFavItem', item);
        item.selected = false;
        this.$store.dispatch('set_node_list', {});
      }
      else{
        this.$store.dispatch('addFavItem', item);
        item.selected = true;
        this.$store.dispatch('set_node_list', {});
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
      const t = 36; //util._.size(this.list);
      const n = util._.size(util._.filter(this.list, (item)=>{
        return item.selected;
      }));

      this.select = {
        t, n
      };
    },

    clickVoteBtn(){
      const list = [];
      util._.each(this.list, (item)=>{
        if(item.selected){
          list.push(item.Producer_public_key);
        }
        
      });
      const url = util.buildVoteSchema(list);


    },

    searchForList(text){
      this.$store.commit('set_node_page_search', text);
      this.$store.dispatch('set_node_list', {});
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
    },
    filter_active(){
      return this.$store.state.node_page_filter;
    }
  },

  created(){
    util.register('set_tab', (key, tab)=>{
      if(tab === 'tab1'){
        this.$store.dispatch('set_node_list', {});
      }
    })

    
  },
  watch: {
    value(v, ov){
      if(!this.fn.search_debounce){
        this.fn.search_debounce = util._.debounce(()=>{
          this.searchForList(this.value);
        }, 500);
      }
      this.fn.search_debounce.call(this);
      
    }
  },

  mounted(){
    
    
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
    margin-bottom: 35px;
  }

  .x-btn{
    position: absolute;
    right: 20px;
    z-index: 99;
    bottom: 50px;
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
    bottom: -33px;;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }
  .mint-search-list{
    display: none;
  }
}
</style>


