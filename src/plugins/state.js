import { ref } from 'vue'

export const SS = window.sessionStorage

export const channel = ref({})
export const list = ref([])
export const topic = ref(null)
export const editor = ref(null)
export const draft = ref({ title: '', content: '' })
export const result = ref([])
export const keyword = ref('')
