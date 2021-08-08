import { SS, channel, list, topic, editor, result, keyword } from './state.js'

export const token = () => ({ headers: { token: SS.token } })

export function popError (err) {
  Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  return false
}

export const getList = (timestamp=null) => {
  let url = `/api/${SS.channel}`
  if (timestamp != null) url += '/?timestamp=' + timestamp
  return axios.get(url, token())
    .then(res => { list.value = res.data })
    .catch(popError)
}

export const getTopic = (id, timestamp=null) => {
  let url = `/api/${SS.channel}/${id}`
  if (timestamp != null) url += '/?timestamp=' + timestamp
  return axios.get(url, token())
    .then(res => { topic.value = res.data })
    .catch(popError)
}

export const postTopic = () => {
  if (!editor.value) return false
  return axios.post(`/api/${SS.channel}/`, editor.value, token())
    .then(() => '发布讨论成功')
    .catch(popError)
}

export const postComment = () => {
  return axios.post(`/api/${SS.channel}/${topic.value._id}`, editor.value, token())
    .then(res => '发布评论成功')
    .catch(popError)
}

export const deleteComment = (id) => {
  return axios.delete(`/api/${SS.channel}/${topic.value._id}/${id}`, token())
    .then(res => {
      Swal.fire('成功', res.data, 'success')
      topic.value.comments = topic.value.comments.filter(a => a._id !== id)
    })
    .catch(popError)
}

export const searchContent = () => {
  return axios.get(`api/topic/search/${keyword.value}`, token())
    .then(res => { result.value = res.data })
    .catch(popError)
}