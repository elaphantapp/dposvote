import _ from 'lodash';
const node_list = [
  {
    id : 1,
    name : 'Blockchain World',
    location : 'Singapore',
    votes : '999888',
    fav : true,
    percentage : 66.6,
    reward : '26988',
    selected : true,
    network_status : 'online'
  },
  {
    id : 2,
    name : 'Blockchain World1',
    location : 'Singapore',
    votes : '999888',
    fav : false,
    percentage : 24.39,
    reward : '26988',
    selected : false,
    network_status : 'offline'
  },
  {
    id : 3,
    name : 'Blockchain World',
    location : 'Singapore',
    votes : '999888',
    fav : true,
    percentage : 66.6,
    reward : '26988',
    network_status : 'away'
  },
  {
    id : 4,
    name : 'Blockchain World1',
    location : 'Singapore',
    votes : '999888',
    fav : false,
    percentage : 24.39,
    reward : '26988',
    network_status : 'online'
  },
  {
    id : 5,
    name : 'Blockchain World',
    location : 'Singapore',
    votes : '999888',
    fav : true,
    percentage : 66.6,
    reward : '26988',
    network_status : 'online'
  },
  {
    id : 6,
    name : 'Blockchain World1',
    location : 'Singapore',
    votes : '999888',
    fav : false,
    percentage : 24.39,
    reward : '26988',
    network_status : 'online'
  },
  {
    id : 7,
    name : 'Blockchain World',
    location : 'Singapore',
    votes : '999888',
    fav : true,
    percentage : 66.6,
    reward : '26988',
    network_status : 'online'
  },
  {
    id : 8,
    name : 'Blockchain World1',
    location : 'Singapore',
    votes : '999888',
    fav : false,
    percentage : 24.39,
    reward : '26988',
    network_status : 'online'
  },
  {
    id : 9,
    name : 'Blockchain World',
    location : 'Singapore',
    votes : '999888',
    fav : true,
    percentage : 66.6,
    reward : '26988',
    network_status : 'online'
  },
  {
    id : 10,
    name : 'Blockchain World1',
    location : 'Singapore',
    votes : '999888',
    fav : false,
    percentage : 24.39,
    reward : '26988',
    network_status : 'online'
  }
];
const F = {
  node_list : node_list,
  me_info : {
    vp_used : '200.4563',
    vp_total : '412.3456',
    
  },

  node_detail : {
    id : 1,
    name : 'Blockchain World',
    location : 'Singapore',
    votes : '999888',
    fav : true,
    percentage : 66.6,
    reward : '26988',
    network_status : 'online',
    status : 'Active',
    rank : 15,
    url : 'http://www.baidu.com',
    public_key : '0x68asdfnskjfksdkjfks9989283',
    votes_gap : {
      '24' : '-112',
      '96' : '+323'
    }
  },

  my_votes_list : [
    {
      id : 1,
      number : 1200,
      time : Date.now(),
      node : 18,
      status : 'Confirming'
    },
    {
      id : 2,
      number : 100,
      time : Date.now(),
      node : 12,
      status : 'Success'
    },
    {
      id : 3,
      number : 25,
      node : 9,
      node : 12,
      status : 'Failure'
    }
  ],
  my_vote_detail : {
    id : 2,
    number : 100,
    time : Date.now(),
    node : 12,
    status : 'Success',
    node_list : node_list
  }
};

export default F;