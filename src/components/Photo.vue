<template>
	<div
		style="display: flex; width: 100%; flex-wrap: wrap; justify-content: space-around"
		:class="{ empty: false }">
		<div
			@click="currentPhoto = nessasaryPhoto"
			v-for="nessasaryPhoto in mandatoryPhotoList"
			:key="nessasaryPhoto">
			<span style="display: flex; justify-content: center; width: auto; font-size: small;">{{
				PhotoNumberBuyer[nessasaryPhoto]
			}}</span>

			<UploadPhotoJS :photoSrc="pictures[nessasaryPhoto]" />
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { PhotoNumberBuyer } from './GlobalConstants.js';
import UploadPhotoJS from './UploadPhotoJS.vue';
import br45 from '/src/components/br45.jpg';
import bl45 from '/src/components/bl45.jpg';
import fr45 from '/src/components/fr45.jpg';
import fl45 from '/src/components/fl45.jpg';
import board from '/src/components/board.jpg';
import panel from '/src/components/panel.jpg';

const pictures = { 10: fl45, 20: br45, 22: board, 290: panel, 19: fr45, 11: bl45 };

const photos = ref({});
const mandatoryPhotoList = [10, 20, 22, 290, 19, 11];

function setNewPhoto() {}
function deletePhoto() {}
</script>
