/*!
* BaseTransitionBox
* create: 2017-12-06
* since: 0.0.1
*/

<template lang="pug">
	div
		//- transition(
		//- 	appear
		//- 	enter-active-class="zoomIn animated"
		//- 	leave-active-class="zoomOut animated"
		//- 	@after-enter="afterEnter"
		//- 	@before-leave="beforeLeave"
		//- 	mode="out-in"
		//- )
			router-view(:pageSwitched='pageSwitched')
		router-view(:pageSwitched='pageSwitched')
		//- img.logo(src="http://static.bagazhu.com/images/logo/k_logo_sm.png")
</template>

<script>
export default {
	data: ()=>{
		return {
			pageSwitched: false
		}
	},
	methods: {
		// afterEnter: function(){
		// 	this.pageSwitched = true;
		// 	this.$root.Bus.$emit('pageSwitched', this.pageSwitched);
		// },
		// beforeLeave: function(){
		// 	this.pageSwitched = false;
		// 	this.$root.Bus.$emit('pageSwitched', this.pageSwitched);
		// },
	},
}
</script>

<style lang="scss" scoped>
// img.logo{
// 	position: absolute;
// 	width: 12rem;
// 	bottom: 2rem;
// 	right: 1rem;
// 	transform: rotate(-25deg);
// }
</style>
