/*!
* home
* create: 2017-12-05
* since: 0.0.1
*/

<template lang="pug">
	div(is="layout")
		router-link(to="/home_cn") 点我去中文版(vue-route跳页)
		a(href="/user/login") 去登陆
		a(href="/api") 去API
		a(href="/404") 去404
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
a{
  display: block;
  font-size: 18px;
  line-height: 24px;
}
</style>
