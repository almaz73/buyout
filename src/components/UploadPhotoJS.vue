<template>
	<div style="min-height: 150px; width: 150px; margin: 8px">
		<div class="avatar-uploader">
			<div class="el-upload">
				<button
					v-if="!showPhoto"
					style="margin: 0 55px; padding: 12px 15px; border: none; cursor: pointer"
					@click="upload()">
					+

				</button>

				<div
					v-if="showPhoto"
					@click="handlePictureCardPreview()"
					style="background: #00000000; width: 100%; height: 100%"></div>

				<input ref="Upload__input" accept="image/*" capture type="file" style="display: none" />
				<input ref="Upload__input_galery" accept="image/*" type="file" style="display: none" />

				<img ref="imagePreview" alt="" style="width: 100%" />
				<!-- <div class="photo-upload">
					
				</div> -->
			</div>

			<div
				class="buttons"
				style="display: flex; justify-content: center; margin-top: 8px"
				v-if="showPhoto">
				<img @click="upload()" alt="" src="./icon-edit-dark.png" />
				<img @click="deleteFile()" alt="" src="./icon-delete-dark.png" />
			</div>
			<div style="height: 42px" v-if="!showPhoto"></div>
		</div>
	</div>
	<Teleport to="body">
		<el-dialog v-model="dialogVisible">
			<img :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
		</el-dialog>
	</Teleport>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';
import { rotatePhoto } from './GlobFuntions.js';
import { ref } from 'vue';

const showPhoto = ref(false);
let originalWidth = null;
let originalHeight = null;

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const Upload__input = ref(null);
const Upload__input_galery = ref(null);
const imagePreview = ref(null);

function upload() {
	console.log('showPhoto = ', showPhoto.value);
	ElMessageBox.confirm('', 'Выберите фото для загрузки', {
		confirmButtonText: 'Камера',
		cancelButtonText: 'Галерея',
		center: true,
	})
		.then(res => {
			console.log('Upload__input.value = ', Upload__input.value);
			Upload__input.value.click();
			Upload__input.value.addEventListener('change', photoInp);
		})
		.catch(res => {
			console.log('Upload__input_galery = ', Upload__input_galery.value);
			Upload__input_galery.value.click();
			Upload__input_galery.value.addEventListener('change', photoInp);
		});
}

function photoInp(e) {
	if (e.target.files && e.target.files[0]) {
		const file = e.target.files[0];

		const reader = new FileReader();

		reader.onload = function (e) {
			showPhoto.value = true;

			// Загружаем оригинальное изображение
			let originalImageData = e.target.result;
			imagePreview.value.src = originalImageData;

			// Получаем размеры изображения
			const img = new Image();
			img.onload = function () {
				originalWidth = img.width;
				originalHeight = img.height;
			};
			img.src = originalImageData;

			// emits('setNewPhoto', originalImageData);
		};

		reader.readAsDataURL(file);
	}

	removeEventListener();
}

function removeEventListener() {
	Upload__input.value.removeEventListener('change', photoInp);
}

function deleteFile() {
	imagePreview.value.src = null;
	showPhoto.value = false;
	// emits('deletePhoto', props.id);
}
</script>
