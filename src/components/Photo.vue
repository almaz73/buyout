<template>
	<div
		style="display: flex; width: 100%; flex-wrap: wrap; justify-content: space-around"
		:class="{ empty: false }">
		<div
			@click="currentPhoto = nessasaryPhoto"
			v-for="nessasaryPhoto in mandatoryPhotoList"
			:key="nessasaryPhoto">
			<span style="display: flex; justify-content: center; width: auto">{{
				PhotoNumberBuyer[nessasaryPhoto]
			}}</span>

			<UploadPhotoJS />
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { PhotoNumberBuyer } from './GlobalConstants.js';
import UploadPhotoJS from './UploadPhotoJS.vue';

const photos = ref({});
const mandatoryPhotoList = [10, 20, 22, 290, 19, 11];

function setNewPhoto() {}
function deletePhoto() {}
</script>
