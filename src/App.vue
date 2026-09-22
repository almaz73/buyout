<script setup></script>

<template>
	<h1>Онлайн оценка вашего автомобиля</h1>

	<div class="form-root">
		<el-tabs type="border-card">
			<el-tab-pane label="Описание">
				<InputForm></InputForm>
			</el-tab-pane>
			<el-tab-pane label="Фото">
				<p>Добавьте фото <br />необходимые для оценки автомобиля</p>
			</el-tab-pane>
			<el-tab-pane label="Детали">
				<p>Опишите, если есть какие-то повреждения</p>
			</el-tab-pane>
		</el-tabs>
		<div class="form-rigth"></div>
	</div>
</template>

<style scoped></style>
<script setup>
import InputForm from './components/InputForm.vue';
</script>
