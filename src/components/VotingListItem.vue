<template>
  <div class="cm-VotingListItem" 
    @click="clickItem()"
    :class="{'s-vote':status==='vote'}">
    <div class="c-checkbox" :class="{'selected':!!item.selected}">
      <div class="tc"></div>
    </div>

    <div class="c-icon">
      <img src="../assets/avatar.png" />
      <i class="c-status" :class="{
        's1':item.State==='Activate', 
        's2':item.State==='Inactivate'
      }"></i>
    </div>

    <div class="c-bdy">
      <p class="p p1">{{item.Nickname}}</p>
      <p class="p p2">{{index}}</p>
      <i class="kg-png p p3"></i>
      <i class="kg-png p p4"></i>
      <p class="p p5">{{$t('country')[item.Location]}}</p>
      <p class="p p6">+{{item.EstRewardPerYear}} ELA/{{$t('YEAR')}} ({{$t('EST')}})</p>
      <i v-if="showFav" @click="toggleFav($event)" class="fa fa-star p p7" :class="item.fav?'active':''"></i>
      <p class="p p8">{{item.Value || 0}} {{$t('01')}}</p>
      <p class="p p9">{{item.Percentage}}%</p>

      <div class="c-per" :style="{width:(item.Percentage+'%')}"></div>
    </div>
    
  </div>
</template>
<script>
import util from '@/util';
export default {
  props : {
    item : null,
    index : Number,
    status : null,  //list, vote 
    clickFn : null,
    favFn : null,
    showFav : {
      type : Boolean,
      default : true
    }
  },
  mounted() {
    
  },
  methods : {
    clickItem(){
      this.clickFn.call(null, this.item);
    },
    toggleFav(e){
      e.stopPropagation();
      this.favFn && this.favFn(this.item);
    }
  }
}
</script>
<style lang="scss">
.cm-VotingListItem{
  text-align: left;
  height: 88px;
  padding: 16px 15px;
  background: #fff;
  margin-bottom: 8px;
  position: relative;
  padding-left: 46px;

  .c-icon{
    position: absolute;
    top: 15px;
    left: 16px;
    width:24px;
    height:24px;

    .c-status{
      display: block;
      width: 12px;
      height: 12px;
      border: 2px solid #fff;
      border-radius: 6px;
      background: rgb(193, 193, 193);
      position: absolute;
      bottom: -2px;
      right: -2px;

      &.s1{
        background: rgb(33, 206, 49);
      }
      &.s2{
        background: rgb(234, 141, 7);
      }
    }

    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .c-bdy{
    position: relative;
    height: 62px;

    .p{
      position: absolute;
    }
    .p1{
      font-size: 16px;
      font-weight: 500;
      top: -2px;
      left: 0;
      color: #454545;
    }
    .p2{
      top: 25px;
      color: $blue_color;
      display: inline;
      padding: 0px 6px;
      background: rgb(242, 242, 249);
      font-size: 12px;
    }
    .p3{
      top: 29px;
      left: 32px;
      color: #ccc;
      display: block;
      width: 10px;
      height: 12px;
      background-position: -48px -178px;
    }
    .p4{
      top: 49px;
      left: 32px;
      display: block;
      width: 12px;
      height: 12px;
      background-position: -74px -177px;
    }
    .p5{
      top: 24px;
      left: 50px;
      color: #9c9c9c;
      font-size: 12px;
    }
    .p6{
      top: 46px;
      left: 50px;
      color: #9c9c9c;
      font-size: 12px;
    }
    .p7{
      top: 2px;
      right: 0;
      color: rgb(242, 242, 249);
      &.active{
        color: $blue_color;
      }
    }
    .p8{
      top: 24px;
      right: 0;
      color: #666;
      font-size: 12px;
    }
    .p9{
      top: 46px;
      right: 0;
      font-size: 12px;
      color: #666;
    }
  }
  .c-per{
    height: 2px;
    position: absolute;
    background: $blue_color;
    bottom: -10px;
    width: 100%;
    left: 0;
  }

  .c-checkbox{
    width: 15px;
    height: 15px;
    border: 2px solid rgb(207, 209, 217);
    position: absolute;
    left: 12px;
    top: 36px;
    display: none;

    &.selected{
      .tc{
        display: block;
      }
    }

    .tc{
      position: absolute;
      display: none;
      top: 2px;
      left: 2px;
      width: 7px;
      height: 7px;
      background: $blue_color;
    }
  }

  &.s-vote{
    padding-left: 70px;
    .c-icon{
      left: 40px;
    }
    .c-checkbox{
      display: block;
    }
  }
}
</style>


