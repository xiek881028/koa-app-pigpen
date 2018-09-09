/*!
* NotFound
* create: 2017-12-14
* since: 0.0.1
*/

<template lang="pug">
	div(is="BaseLayout")
		.indexBox
			.infoBox
				.title 404
				.info 很抱歉，您访问的页面被小萌萌吃掉惹
				a.button.button-primary(href="/" replace) 返回首页
			canvas(id="evanyou-canvas")
</template>

<script>
import BaseLayout from './BaseLayout.vue';
import Evanyou from '../../assets/evanyou.js';
export default {
	components: {
		BaseLayout,
	},
	mounted() {
		Evanyou();
	},
}
</script>

<style lang="scss" scoped>
.indexBox{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	canvas{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 1;
		pointer-events: none;
	}
	.infoBox{
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #2c3e50;
		.title{
			font-size: 6rem;
		}
		.info{
			font-size: 1.2rem;
			padding: 1.5rem 0 2rem;
		}
	}
}
</style>
