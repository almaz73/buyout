<script setup>
import Photo from './components/Photo.vue';
import InputForm from './components/InputForm.vue';
</script>

<template>
	<h1>Онлайн оценка вашего автомобиля</h1>

	<div class="form-root">
		<el-tabs type="border-card">
			<el-tab-pane label="Описание автомобиля">
				<InputForm></InputForm>
			</el-tab-pane>
		</el-tabs>

		<el-tabs type="border-card" style="width: 420px">
			<el-tab-pane label="Фото для оценки автомобиля">
				<Photo></Photo>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style>

</style>
