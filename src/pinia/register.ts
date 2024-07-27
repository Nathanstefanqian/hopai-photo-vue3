// stores/registration.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    formData: ref({
      orderType: false,
      agreement: [],
      area: { areaId: '', areaName: '' },
      mobile: '',
      nickname: '',
      wechatId: '',
      camera: '',
      lightingEquipment: '',
      zoomLens: '',
      fixedFocalLengthLens: '',
      littleRedBookId: '',
      douYinId: '',
      photoList: []
    })
  }),
  actions: {
    async updateFormData(newData: Partial<typeof this.formData>) {
      this.formData = { ...this.formData, ...newData }
      await this.saveToLocalStorage()
    },
    async saveToLocalStorage() {
      uni.setStorage({
        key: 'formData',
        data: this.formData
      })
    },
    async loadFromLocalStorage() {
      try {
        const { data } = await uni.getStorage({ key: 'formData' })
        this.formData = data
      } catch (e) {
        console.warn('Failed to load formData from localStorage', e)
      }
    }
  }
})
