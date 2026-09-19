<template>
	<div class="form-auto">
		<el-form ref="formRef" :model="auto">
			<div class="input-group" style="max-width: 310px">
				<span>VIN номер</span>
				<el-form-item
					prop="vin"
					:rules="[{ validator: checkVIN, required: true, min: 17, max: 17, trigger: ['blur'] }]">
					<el-input
						@change="auto.vin.length > 16 && datasSaved()"
						size="large"
						onfocus="this.select()"
						placeholder="Введите VIN"
						v-model="auto.vin"
						maxlength="17"
						minlength="17"
						clearable />
				</el-form-item>
			</div>

			<div class="form-pair">
				<div class="input-group">
					<span>Марка</span>
					<el-form-item
						prop="brandId"
						:rules="{
							required: true,
							message: 'Не выбрана марка автомобиля',
							trigger: ['blur', 'change'],
						}">
						<el-select
							size="large"
							clearable
							filterable
							placeholder="Выберите марку"
							@change="getModels(auto.brandId, false)"
							v-model="auto.brandId">
							<el-option
								v-for="item in brands"
								class="frame_pub_st"
								:key="item.id"
								:label="item.name"
								:value="item.id" />
						</el-select>
					</el-form-item>
				</div>

				<div class="input-group">
					<span>Модель</span>
					<el-form-item
						prop="modelId"
						:rules="{
							required: true,
							message: 'Не выбрана модель',
							trigger: ['blur', 'change'],
						}">
						<el-select
							size="large"
							clearable
							filterable
							placeholder="Выберите модель"
							@change="getGenerations(auto.modelId, false)"
							v-model="auto.modelId">
							<el-option
								v-for="item in models"
								class="frame_pub_st"
								:key="item.id"
								:label="item.name"
								:value="item.id" />
						</el-select>
					</el-form-item>
				</div>
			</div>

			<div class="form-pair">
				<div class="input-group">
					<span>Поколение</span>
					<el-form-item
						prop="generationId"
						:rules="{
							required: true,
							message: 'Не выбрано поколение модели',
							trigger: ['blur', 'change'],
						}">
						<el-select
							size="large"
							clearable
							@change="setYears(auto.generationId, false)"
							placeholder="Выберите поколение"
							v-model="auto.generationId">
							<el-option
								v-for="item in generations"
								class="frame_pub_st"
								:key="item.id"
								:label="item.name"
								:value="item.id" />
						</el-select>
					</el-form-item>
				</div>

				<div class="input-group">
					<span>Год выпуска</span>
					<el-form-item
						prop="yearReleased"
						:rules="{
							required: true,
							message: 'Не выбран год выпуска',
							trigger: ['blur', 'change'],
						}">
						<el-select
							size="large"
							clearable
							placeholder="Выберите год выпуска"
							@change="getModifications(auto.generationId, false)"
							v-model="auto.yearReleased">
							<el-option
								v-for="item in years"
								class="frame_pub_st"
								:key="item"
								:label="item"
								:value="item" />
						</el-select>
					</el-form-item>
				</div>
			</div>

			<div class="form-pair">
				<div class="input-group">
					<span>Модификация</span>
					<el-form-item
						prop="modificationId"
						:rules="{
							required: true,
							message: 'Не выбрана модификация модели',
							trigger: ['blur', 'change'],
						}">
						<el-select
							size="large"
							clearable
							placeholder="Выберите модификацию"
							@change="getComplectations(auto.modificationId)"
							v-model="auto.modificationId">
							<el-option
								class="two_row frame_pub_st"
								v-for="item in modifications"
								:key="item.id"
								:label="item.name"
								:value="item.id" />
						</el-select>
					</el-form-item>
				</div>

				<div class="input-group">
					<span>Пробег</span>
					<el-form-item
						prop="mileage"
						:rules="{
							validator: checkMili,
							equired: true,
							message: 'Не выбран Пробег',
							trigger: ['blur', 'change'],
						}">
						<el-input
							v-model="auto.mileage"
							size="large"
							clearable
							@change="datasSaved()"
							@input="
								() => {
									changeMiles();
									auto.mileage = numberWithSpaces(auto.mileage);
								}
							" />
					</el-form-item>
				</div>
			</div>

			<div class="form-pair" style="margin-bottom: 20px">
				<div class="input-group">
					<span>Количество владельцев по ПТС</span>
					<el-form-item
						prop="countHostsByVC"
						:rules="{
							required: true,
							message: 'Не заполнено количество владельцев',
							trigger: ['blur', 'change'],
						}">
						<el-input-number
							v-model="auto.countHostsByVC"
							:min="1"
							:max="20"
							@change="datasSaved()" />
					</el-form-item>
				</div>

				<div class="input-group">
					<span>Описание повреждений</span>
					<el-form-item
						title="Указываются ранее крашенные элементы, все текущие повреждения (узлы, агрегаты, жестянка)"
						prop="comment"
						:rules="{
							required: true,
							message:
								'Укажите ранее крашенные элементы, все текущие повреждения (узлы, агрегаты, жестянка)',
							trigger: ['blur', 'change'],
						}">
						<el-input
							class="textarea_field"
							type="textarea"
							v-model="auto.comment"
							placeholder="Укажите  повреждения" />
					</el-form-item>
				</div>
			</div>

			<div class="form-pair">
				<div class="input-group">
					<span>Телефон</span>
					<el-form-item
						prop="phone"
						:rules="{
							required: true,
							message: 'Не выбран Телефон',
							trigger: ['blur', 'change'],
						}">
						<el-input
							placeholder="Телефон"
							title="Телефон"
							size="large"
							clearable
							@change="datasSaved()"
							:formatter="value => value && formattingPhone(value, val => (auto.phone = val))"
							v-model="auto.phone" />
					</el-form-item>
				</div>

				<div class="input-group">
					<span>Email</span>
					<el-form-item>
						<el-input
							placeholder="Email"
							clearable
							size="large"
							@change="
								emailValidate(auto.email);
								datasSaved();
							"
							title="Email"
							v-model="auto.email" />
					</el-form-item>
				</div>
			</div>

			<div class="form-pair">
				<div class="input-group">
					<span>Город</span>
					<el-form-item
						prop="city"
						:rules="{ required: true, message: 'Не выбран Город', trigger: ['blur', 'change'] }">
						<el-select
							size="large"
							clearable
							placeholder="Выберите город"
							@change="datasSaved()"
							v-model="auto.city">
							<el-option
								v-for="item in cities"
								class="frame_pub_st"
								:key="item"
								:label="item"
								:value="item" />
						</el-select>
					</el-form-item>
				</div>

				<div class="input-group">
					<span>ФИО</span>
					<el-form-item
						prop="fullName"
						:rules="{ required: true, message: 'Не выбрано Имя', trigger: ['blur', 'change'] }">
						<el-input
							input-style="500px"
							@change="datasSaved()"
							size="large"
							clearable
							placeholder="Введите имя"
							v-model="auto.fullName" />
					</el-form-item>
				</div>
			</div>
		</el-form>

		<div style="margin-top: 20px">
			<el-button size="large" @click="removeDatas()"> Очистить </el-button>

			<el-button type="primary" size="large" @click="nextPage()">Сохранить</el-button>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
// import { Calendar } from '@element-plus/icons-vue';
// import { lo } from 'element-plus/es/locales.mjs';
import {
	checkVIN,
	emailValidate,
	formattingPhone,
	numberNoSpace,
	numberWithSpaces,
	simplePhone,
	checkMili,
} from '../GlobFuntions.js';

const auto = ref({
	vin: '',
	brandId: '',
	modelId: '',
	generationId: '',
	yearReleased: '',
	modificationId: '',
	mileage: '',
	countHostsByVC: 0,
	comment: '',
	phone: '',
	email: '',
	city: '',
	fullName: '',
	mileage: '',
});
const brands = ref([]);
const models = ref([]);
const generations = ref([]);
const years = ref([]);
const modifications = ref([]);
const cities = ref([]);
const formRef = ref();

let timerSave = null;

function datasSaved() {
	// локально запоминаем введенные данные
	let newDatas = {};
	Object.entries(auto.value).forEach(el => {
		if (el[1]) newDatas[el[0]] = el[1];
	});
	if (Object.keys(newDatas).length) {
		// isDatas.value = true
		saveF(newDatas);
	}

	function saveF(val) {
		if (timerSave) clearTimeout(timerSave);
		timerSave = setTimeout(() => {
			localStorage.setItem('datas', JSON.stringify(val));
			console.log(' - - - - - - - - -  ');
		}, 200);
	}
}

function getModels() {
	console.log('getModels');
}

function getGenerations() {
	console.log('getGenerations');
}

function setYears() {
	console.log('setYears');
}

function changeMiles() {
	if (auto.value.mileage) mileage500.value = numberNoSpace(auto.value.mileage) / 5000;
}

// function remove() {
//   localStorage.removeItem('datas')
//   isDatas.value = null
//   auto.value = {}
//   resetForm(formRef.value)
//   models.value = []
//   generations.value = []
//   modifications.value = []
//   years.value = []
// }
function removeDatas() {}
function nextPage() {}
</script>
