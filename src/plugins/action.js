import { SS, channel, list, topic, draft, result, keyword } from './state.js'

export const token = () => ({ headers: { token: SS.token } })

export function popError (err) {
  console.log(err)
  Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  return false
}

export const getList = (timestamp=null) => {
  let url = `/api/${channel.value._id}`
  if (timestamp != null) url += '/?timestamp=' + timestamp
  return axios.get(url, token())
    .then(res => { list.value = res.data })
    .catch(popError)
}

export const getTopic = (id, timestamp=null) => {
  let url = `/api/${channel.value._id}/${id}`
  if (timestamp != null) url += '/?timestamp=' + timestamp
  return axios.get(url, token())
    .then(res => { topic.value = res.data })
    .catch(popError)
}

export const postTopic = () => {
  if (!draft.value) return false
  return axios.post(`/api/${channel.value._id}/`, draft.value, token())
    .then(() => true)
    .catch(popError)
}

export const putTopic = () => {
  if (!draft.value || !topic.value) return false
  return axios.put(`/api/${channel.value._id}/${topic.value._id}`, draft.value, token())
    .then(() => true)
    .catch(popError)
}

export const deleteComment = (id) => {
  return axios.delete(`/api/${channel.value._id}/${topic.value._id}/${id}`, token())
    .then(res => {
      Swal.fire('成功', res.data, 'success')
      topic.value.comments = topic.value.comments.filter(a => a._id !== id)
    })
    .catch(popError)
}

export const postComment = (t, d) => {
  return axios.post(`/api/${channel.value._id}/${t}`, d, token())
    .then(async res => {
      Swal.fire('成功', '', 'success')
      topic.value.comments.push(d)
    })
    .catch(popError)
}

export const searchContent = () => {
  return axios.get(`api/topic/search/${keyword.value}`, token())
    .then(res => { result.value = res.data })
    .catch(popError)
}