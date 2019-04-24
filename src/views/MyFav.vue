<template>
  <div class="p-myFav kg-page">
    <!-- <mt-header :title="$t('FAVORITES')">
    </mt-header> -->

    <div class="kg-body kg-tab">
      <div class="c-list">
        <VotingListItem 
          v-for="(item, i) in list" v-bind:key="i" 
          v-bind:status="vote_status"
          v-bind:clickFn="clickItem"
          v-bind:item="item" 
          v-bind:favFn="favItem"
          v-bind:index="i+1">
        
        </VotingListItem>
      </div>
    </div>

    <div class="x-btn" @click="toggleListStatus()">
      <div class="kg-png" slot="icon"></div>
    </div>

    <div class="v-btn" v-if="vote_status==='vote'">
      <mt-button @click="clickVoteBtn()" :disabled="select.n<1" size="large" class="cb" type="primary">
        {{$t('02')}} <span style="font-size: 12px;">{{`(${select.n}/${select.t})`}}</span>
      </mt-button>
    </div>

  </div>
</template>
<script>
import util from '@/util';
import VotingListItem from '../components/VotingListItem';
export default {
  data(){
    return {
      vote_status : 'list',
      select : {
        n : 0,
        t : 0
      }
    };
  },
  components: {
    VotingListItem
  },
  computed: {
    list(){
      if(this.$store.state.my_fav_list){
        // util.loading(false);
        const list = util._.map(this.$store.state.my_fav_list, (item)=>{
          item.fav = true;
          item.selected = true;
          return item;
        });
        return list;
      }

      // util.loading(true);
      return [];
    }
  },
  created(){
    util.register('set_tab', (key, tab)=>{
      if(tab === 'tab2'){
        this.$store.dispatch('set_my_fav_list', {});
      }
    })
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
    favItem(item){
      if(this.vote_status === 'vote'){
        return false;
      }
      this.$store.dispatch('removeFavItem', item);
      this.$store.dispatch('set_my_fav_list', {});
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
      const list = [];
      util._.each(this.list, (item)=>{
        if(item.selected){
          list.push(item.Producer_public_key);
        }
        
      });
      const url = util.buildVoteSchema(list);


    }
  },

  mounted(){
    
  }
}
</script>
<style lang="scss">
.p-myFav{

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
    bottom: -10px;;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }

}
</style>

