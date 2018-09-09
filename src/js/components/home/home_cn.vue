/*!
* home_cn
* create: 2017-12-05
* since: 0.0.1
*/

<template lang="pug">
	div(is="layout")
		h1 你好！世界~
		router-link(to="/") 点我去英文版
		i by bagazhu
</template>

<script>
import layout from '../base/BaseLayout.vue';
export default{
	components: {
		layout,
	},
}
</script>

<style lang="scss" scoped>
h1{
	color: #ff0;
}
</style>
