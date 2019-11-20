<template>
  <div class="home">
    <view-box ref="viewBox">
      <!-- 内容信息 -->
      <div class="headTop">
        <group>
          <popup-radio title="题目类型" :options="titleOptionName" v-model="titleTypeName"></popup-radio>
        </group>
        <group>
          <x-input title="关键字" v-model="searchInput"></x-input>
        </group>
      </div>
      <div class="forContent">
        <div v-for="item in resultArr" :key="item.title">
          <p>题目：{{ item.content }}</p>
          <p>答案：{{ item.ans }}</p>
          <p v-if="item.ans === 'A' || item.ans === 'B' || item.ans === 'C' || item.ans === 'D' ">答案内容: {{ item[item.ans] }}</p>
        </div>
      </div>
      <!-- 底部导航 -->
      <tabbar @on-index-change="tabChange" v-model="course">
        <tabbar-item>
          <span slot="label">模拟电路</span>
        </tabbar-item>
        <tabbar-item>
          <span slot="label">数字电路</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Divider, Tabbar, TabbarItem, ViewBox, Group, PopupRadio, XInput } from 'vux'
import answer from '@/components/answer.js';
export default {
  name: 'home',
  data () {
    return {
      course: 0, // 0表示模拟电路  1 表示数字电路
      titleTypeName: '', // 题目类型
      titleOption: [], // 题目可选类型
      titleOptionName: [],
      searchInput: '',
      resultArr: [],
    }
  },
  watch: {
    searchInput(value) {
      if ( value !== '' && this.titleType !== '' ) {
        // 筛选数据
        this.resultArr = answer[this.currentCourse][this.titleType].filter(item=>{
          return item.content.indexOf(value) > -1
        })
      } else {
        this.resultArr = [];
      }
    },
    titleTypeName(newVal, oldVal) {
      if ( newVal !== '' && oldVal !== '' ) {
        // 清空数据
        if ( newVal !== oldVal ) {
          this.searchInput = '';
          this.resultArr = [];
        }
      }
    }
  },
  computed: {
    currentCourse() {
      if ( this.course === 0 ) {
        return 'mndl'
      } else {
        return 'szdl'
      }
    },
    titleType () {
      if ( this.titleTypeName === '判断' ) {
        return 'panduan';
      } else if ( this.titleTypeName === '单选' ) {
        return 'danxuan';
      } else if ( this.titleTypeName === '多选' ) {
        return 'duoxuan';
      } else if ( this.titleTypeName === '填空' ) {
        return 'tiankong';
      } else if ( this.titleTypeName === '问答' ) {
        return 'wenda';
      }
    },

  },
  methods: {
    tabChange() {
      this.titleOption = [];
      if ( this.course === 0 ) {
        // 模拟电路
        // 获取title
        for ( let i in answer['mndl'] ) {
          this.titleOption.push(i)
        }
        this.titleOptionName = ['判断','单选'];
      } else if ( this.course === 1 ) {
        // 数字电路
        for ( let i in answer['szdl'] ) {
          this.titleOption.push(i)
        }
        this.titleOptionName = ['判断','单选','多选','填空','问答'];
      }
    }
  },
  components: {
    Divider, Tabbar, TabbarItem, ViewBox, Group, PopupRadio, XInput
  }
}
</script>
<style lang="less">
  .home {
    height: 100%; width: 100%; overflow-y: scroll; -webkit-overflow-scrolling: touch;
    .weui-tab__panel {
      padding-top: 140px;
    }
    .headTop {
      position: fixed; left: 0; top: 0; background: #F6F6F6; width: 100%;
    }
    .forContent {
      padding: 6px 10px; line-height: 1.6;
      > div {
        margin-bottom: 10px; border-bottom: 1px dashed #000; padding-bottom: 5px;
      }
    }
  }
</style>