import { ref, computed, watch, watchEffect } from 'vue'

export const SS = window.sessionStorage
export const token = () => ({ headers: { token: SS.token } })

export function popError (err) {
  Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  return false
}

export const list = ref([])
export const topic = ref(null)
export const draft = ref(null)
export const comments = ref([])
export const result = ref([])
export const keyword = ref('')

export const getList = (onlyPublic) => {
  return axios.get('/api/topic', onlyPublic ? {} : token())
    .then(res => { list.value = res.data })
    .catch(popError)
}
export const getTopic = (id) => {
  return axios.get(`api/topic/${id}`, token())
    .then(res => { topic.value = res.data })
    .catch(popError)
}
export const postTopic = () => {
  if (!draft.value) return false
  return axios.post('api/topic', draft.value, token())
    .then(() => true)
    .catch(popError)
}
export const putTopic = () => {
  if (!draft.value || !topic.value) return false
  return axios.put('api/topic/' + topic.value._id, draft.value, token())
    .then(() => true)
    .catch(popError)
}
export const getComment = (id) => {
  return axios.get(`/api/comment/${id}`, token())
    .then(res => { comments.value = res.data })
    .catch(popError)
}
export const deleteComment = (id) => {
  return axios.delete(`/api/comment/${id}`, token())
    .then(res => {
      Swal.fire('成功', res.data, 'success')
      comments.value = comments.value.filter(a => a._id !== id)
    })
    .catch(popError)
}
export const postComment = (topic, draft) => {
  return axios.post(`/api/comment/${topic}`, draft, token())
    .then(async res => {
      Swal.fire('成功', '', 'success')
      await getComment(topic)
    })
    .catch(popError)
}
export const searchContent = () => {
  return axios.get(`api/topic/search/${keyword.value}`, token())
    .then(res => { result.value = res.data })
    .catch(popError)
}