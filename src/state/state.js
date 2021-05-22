import { ref, computed, watch, watchEffect } from 'vue'
import axios from 'axios'

const SS = window.sessionStorage
const opt = { headers: { token: SS.token } }

function popError (err) {
  window.Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  return false
}

export const list = ref([])
export const topic = ref(null)
export const draft = ref(null)
export const comments = ref([])
export const result = ref([])
export const keyword = ref('')

export const updateTopic = (t) => { topic.value = t }
export const updateDraft = (d) => { draft.value = d }
export const updateToken = () => { opt.headers.token = SS.token }
export const updateComments = (c) => { comments.value = c }
export const updateKeyword = (k) => {
  keyword.value = k
  result.value = []
}

export const getList = (onlyPublic) => {
  return axios.get('/api/topic', onlyPublic ? {} : opt)
    .then(res => { list.value = res.data })
    .catch(popError)
}
export const getTopic = (payload) => {
  return axios.get(`api/topic/${payload}`, opt)
    .then(res => { topic.value = res.data })
    .catch(popError)
}
export const postTopic = () => {
  if (!draft.value) return false
  return axios.post('api/topic', draft.value, opt)
    .then(() => true)
    .catch(popError)
}
export const putTopic = () => {
  if (!draft.value || !topic.value) return false
  return axios.put('api/topic/' + topic.value._id, draft.value, opt)
    .then(() => true)
    .catch(popError)
}
export const getComment = (payload) => {
  return axios.get(`/api/comment/${payload}`, opt)
    .then(res => { comments.value = res.data })
    .catch(popError)
}
export const deleteComment = (payload) => {
  return axios.delete(`/api/comment/${payload}`, opt)
    .then(res => {
      window.Swal.fire('成功', res.data, 'success')
      comments.value = comments.value.filter(a => a._id !== payload)
    })
    .catch(popError)
}
export const postComment = (payload) => {
  return axios.post(`/api/comment/${payload.topic}`, payload.draft, opt)
    .then(res => {
      window.Swal.fire('成功', '', 'success')
    })
    .catch(popError)
}
export const searchContent = () => {
  return axios.get(`api/topic/search/${keyword}.value`, opt)
    .then(res => { result.value = res.data })
    .catch(popError)
}