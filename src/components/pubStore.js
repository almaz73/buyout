import {defineStore} from "pinia";
import axios from "axios";

const cache = {}

export const usePubStore = defineStore("pubStore", {
    state: () => ({
        list: []
    }),
    actions: {
        async getBrands() {
            if (cache['getBrands']) return cache['getBrands']
            const res = await axios.get(`/api/auto/getBrands`)
            return (cache['getBrands'] = res)
        },
        async getModels(id) {
            return await axios.get(`/api/auto/getModels?brandId=${id}`)
        },
        async getGenerations(id) {
            return await axios.get(`/api/auto/getGenerations?modelId=${id}`)
        },
        async getModifications(id) {
            return await axios.get(`/api/auto/getModifications?generationId=${id}`)
        },
        async getComplectations(id) {
            return await axios.get(`/api/auto/getComplectations?modificationId=${id}`)
        },
        async saveExternalAppeal(params) {
            return await axios.post(`/api/Appeals/PostExternalAppeal`, params)
        },


    }
})
