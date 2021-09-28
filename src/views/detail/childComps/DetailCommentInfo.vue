<template>
<div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-Info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
  </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
       <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{dateInit()}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
        </div>
      </div>
      </div>
</template>

<script>
export default {
  name:"DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return{
      data:''
    }
  },
  methods:{
    dateInit() {
      this.data = this.commentInfo.created
      let dates = new Date(this.data * 1000)
      let year = dates.getFullYear()
      let month =  dates.getMonth()
      let day = dates.getDay()
      return year + '-' + month + '-' + day 
    }
  }
}
</script>

<style scoped>
.comment-Info {
  padding: 5px 12px;
  color: #333;
  border-bottom:5px solid #f2f5f8;
}
.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.header-title {
  float: left;
  font-size: 15px;
}
.header-more {
  float: right;
  font-size: 13px;
  margin-right: 10px;
}
.info-user {
  padding: 10px 10px 10px;
  font-size: 15px;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.info-detail {
  padding: 0 10px 15px;
}
.info-detail p {
font-size: 14px;
color: #777;
line-height: 1.5;
}
.info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .date {
  margin-right: 8px;
}
.info-imgs img{
  width: 70px;
  height: 70px;
  margin-top: 10px;
  margin-right: 5px;

}
</style>