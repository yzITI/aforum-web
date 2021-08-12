import { SS, channel, list, topic, comments, editor, result, keyword } from './state.js'

export const token = () => ({ headers: { token: SS.token } })

export async function popError (err) {
  await Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  return false
}

export const getChannel = (cid) =>
  axios.get('/api/channel/' + cid, token())
    .then(res => {
      channel.value = res.data
      list.value = res.data.public
      return true
    })
    .catch(popError)

export const putChannel = (cid) =>
  axios.put('api/channel/' + cid, channel.value, token())
    .then(() => '修改成功')
    .catch(popError)

export const getList = (cid, timestamp=null) => {
  let url = `/api/topic/?channel=${cid}`
  if (timestamp != null) url += '&timestamp=' + timestamp
  return axios.get(url, token())
    .then(res => { list.value = res.data })
    .catch(popError)
}

export const getTopic = (id, timestamp=null) =>
  axios.get(`/api/topic/${id}`, token())
    .then(res => { topic.value = res.data })
    .catch(popError)

export const publishTopic = () => {
  if (!editor.value) return false
  return axios.put(`/api/topic/${editor.value._id}?channel=${channel.value._id}`, editor.value, token())
    .then(() => '发布讨论成功')
    .catch(popError)
}

export const getComments = (tid) =>
  axios.get('/api/comment?topic=' + tid, token())
    .then(res => { comments.value = res.data })
    .catch(popError)


export const putComment = () =>
  axios.put(`/api/comment/${editor.value._id}?topic=${topic.value._id}`, editor.value, token())
    .then(res => '发布评论成功')
    .catch(popError)

export const deleteComment = (id) =>
  axios.delete(`/api/comment/${id}`, token())
    .then(res => {
      Swal.fire('成功', res.data, 'success')
      comments.value = comments.value.filter(a => a._id !== id)
    })
    .catch(popError)

export const searchContent = () =>
  axios.get(`api/topic?channel=${channel.value._id}&keyword=${keyword.value}`, token())
    .then(res => { result.value = res.data })
    .catch(popError)
