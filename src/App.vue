<script setup></script>

<template>
	<h1>Онлайн оценка вашего автомобиля</h1>

	<div class="form-root">
		<el-tabs type="border-card">
			<el-tab-pane label="Оценка">
				<InputForm></InputForm>
			</el-tab-pane>
		</el-tabs>
		<div class="form-rigth"></div>
	</div>
</template>

<style scoped></style>
<script setup>
import InputForm from './components/InputForm.vue';
</script>
