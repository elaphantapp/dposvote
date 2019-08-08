<template>
  <div class="kg-page p-myVoteDetail">
    <!-- <mt-header title="Detail">
      <router-link to="" slot="left">
        <mt-button @click.native="$router.back(-1)" icon="back"></mt-button>
      </router-link>
      
    </mt-header> -->

     <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <div class="c-popup">
        <div class="c-header" style="padding:10px 0px 0px 10px">{{$t('12')}}</div>
        <div class="c-body" style="padding:10px 0px">
          <p style="width:300px;;text-align:left;padding:0px 10px 10px 10px">{{$t('14')}}</p>
          <ul style="width:300px;height:200px;overflow:auto;text-align:left;padding:0px 10px">
            <li  v-for="(item, i) in list1" v-bind:key="i">{{item.Nickname}}</li>
          </ul>
          <p class="p3" style="text-align:center;width:300px">
            <mt-button @click="popupVisible=false" size="large" type="primary" style="float:left;width:120px;margin-left:10px;margin-top:10px;margin-bottom:10px;background: #5f6fed;">{{$t('CANCEL')}}</mt-button>
            <mt-button @click="ok" size="large" type="primary" style="float:right;width:120px;margin-top:10px;margin-right:10px;margin-bottom:10px;background: #5f6fed;">{{$t('13')}}</mt-button>
          </p>
     
        </div>
      </div>
    </mt-popup>


    <div class="kg-body" v-if="data">
      <div class="c-top">
        <div class="c1">
          <p class="p1">{{$t('VOTE')}}: (ELA)</p>
          <p class="p2">{{data.number | toF2}}</p>
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

      <div class="c-list" :class="{ 'c-list1': isIos }" style="margin-top: 8px; padding-bottom: 60px;">
        <VotingListItem 
          v-for="(item, i) in data.list" v-bind:key="i" 
          v-bind:status="vote_status"
          v-bind:clickFn="clickItem"
          v-bind:favFn="favItem"
          v-bind:item="item" 
          
          v-bind:index="i+1">
        
        </VotingListItem>
      </div>

    </div>

    <!-- <div class="x-btn" @click="toggleListStatus()">
      <div class="kg-png" slot="icon"></div>
    </div> -->

    <div class="v-btn" :class="{ 'v-btn1': isIos }">
      <mt-button v-if="vote_status==='list'" @click="clickVoteBtn1()" size="large" class="cb" type="primary">
        {{$t('RE_VOTE')}}
      </mt-button>
      <mt-button v-if="vote_status==='vote'" @click="clickVoteBtn2()" :disabled="select.n<1 || select.n>36" size="large" class="cb" type="primary">
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
      list1:[],
      list:[],  
      isIos:false,
      popupVisible : false,  
      vote_status : 'list',
      select : {
        n : 0,
        t : 0
      }
    };
  },

  computed: {
    data(){
      // util.loading(true);
      if(this.$store.state.my_vote_detail){
    
        const id = this.$router.history.current.params.id;
        const d = this.$store.state.my_vote_detail[id];

        console.log(222, d)
    
        // util.loading(false);
        return d;
      }
      
      this.$router.replace('/');
      return null;
    }
  },
  created(){

  },
  methods: {
    ok(){
      this.popupVisible = false;
      util.buildVoteSchema(this.list);
    },
    clickItem(item){
      if(this.vote_status === 'list'){
        this.$store.commit('set_node_detail', item);
        this.$router.push('/my_node_detail');
      }
      else{
        // vote
        item.selected = !item.selected;
        this.vote_status = 'list';
        this.$nextTick(()=>{
          this.vote_status = 'vote';
          this.processSelectNumber();
        })
        
      }
    },
    favItem(item){
      if(item.fav){
        this.$store.dispatch('removeFavItem', item);
      }
      else{
        this.$store.dispatch('addFavItem', item);
      }
      item.fav = !item.fav;
      this.vote_status = 'vote';
      this.$nextTick(()=>{
        this.vote_status = 'list';
      })
      
    },
    clickVoteBtn1(){
      this.vote_status = 'vote';
      this.processSelectNumber();
    },
    clickVoteBtn2(){
      // util.toastSuccess('click vote btn');

      // util._.delay(()=>{
      //   this.vote_status = 'list';
      // }, 3000);

      const list = [];
      const list1 = [];
      util._.each(this.data.list, (item)=>{
        if(item.selected){
          if(item["State"] === "Activate" || item["State"] === "Active"){
           list.push(item.Producer_public_key);
          }else{
            list1.push(item);
          }
        }
      });
       this.list = list;
       this.list1 = list1;
      if(list1.length>0){
          this.popupVisible = true;
          return;
      }
      
      util.buildVoteSchema(list);
      
    },
    processSelectNumber(){
      const t = 36; //util._.size(this.data.list);
      const n = util._.size(util._.filter(this.data.list, (item)=>{
        return item.selected;
      }));

      this.select = {
        t, n
      };
    },

    toggleListStatus(){
      this.vote_status = this.vote_status === 'list' ? 'vote' : 'list';

      if(this.vote_status === 'vote'){
        this.processSelectNumber();
      }
    },
  },
  mounted(){
    
    if(util.isSafari() || util.isIos()){
       this.isIos = true;
    }else{
       this.isIos =false;  
    }
    
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

  .x-btn{
    position: absolute;
    right: 20px;
    z-index: 99;
    bottom: 80px;
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
    bottom: 20px;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }

  .v-btn1{
    position: absolute;
    bottom: 5px;
    
    padding: 0 15px;
    width: 100%;
    .cb{
      background-color: $blue_color;
    }
  }

  .c-list{
     
      margin-top: 8px; 
      padding-bottom: 65px;
  }

   .c-list1{
      margin-top: 8px; 
      padding-bottom: 60px;
  }

}
</style>

