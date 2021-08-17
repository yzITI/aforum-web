import { SS, channel, list, discuss, comments, editor, result, keyword } from './state.js'

export const token = () => ({ headers: { token: SS.token } })

export async function popError (err) {
  await Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  return false
}

export const getChannel = (cid) =>
  axios.get('/api/channel/' + cid, token())
    .then(res => {
      channel.value = res.data
      return true
    })
    .catch(popError)

export const getList = (cid, timestamp=null) => {
  let url = `/api/discuss/?channel=${cid}`
  if (timestamp) url += '&timestamp=' + timestamp
  return axios.get(url, token())
    .then(res => {
      if (timestamp) list.value.push(...res.data)
      else list.value = res.data
      return res.data
    })
    .catch(popError)
}

export const getDiscuss = (id, timestamp) =>
  axios.get(`/api/discuss/${id}`, token())
    .then(res => { discuss.value = res.data })
    .catch(popError)

export const publishDiscuss = () => {
  if (!editor.value) return false
  return axios.put(`/api/discuss/${editor.value._id}?channel=${channel.value._id}`, editor.value, token())
    .then(() => '发布讨论成功')
    .catch(popError)
}

export const getComments = (tid, timestamp) => {
  let url = '/api/comment?discuss=' + tid
  if (timestamp) url += '&timestamp=' + timestamp
  return axios.get(url, token())
    .then(res => {
      if (timestamp) comments.value.push(...res.data)
      else comments.value = res.data
      return res.data
    })
    .catch(popError)
}


export const putComment = () =>
  axios.put(`/api/comment/${editor.value._id}?discuss=${discuss.value._id}`, editor.value, token())
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
  axios.get(`api/discuss?channel=${channel.value._id}&keyword=${keyword.value}`, token())
    .then(res => { result.value = res.data })
    .catch(popError)
