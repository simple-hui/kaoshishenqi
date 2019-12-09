<template>
	<div class="allSzdl">
		<div v-for="item in data.danxuan" :key="item.title">
      <p>题目：{{ item.content }}</p>
      <!-- <p>答案：{{ item.ans }}</p> -->
      <p v-if="titleType === 'danxuan' || titleType === 'duoxuan'">
        答案: <span v-for="items in item.ans.split('|')" class="resultContent">{{ item[items] }}<span>,</span></span>
      </p>
    </div>
	</div>
</template>
<script>
	import answer from '@/components/answer.js';
	export default {
		name: 'allSzdl',
		data () {
			return {
				data: answer.mndl,
				titleType: 'danxuan'
			}
		}
	}
</script>