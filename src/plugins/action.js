import { SS, channel, list, topic, draft, result, keyword } from './state.js'

export const token = () => ({ headers: { token: SS.token } })

export function popError (err) {
  Swal.fire('错误', err.response ? err.response.data : '网络错误', 'error')
  return false
}

export const idGen = (l = 10) =>  
  window.crypto.getRandomValues(new Uint32Array(l)).toString('base64').replace(/\//g, '_').replace(/\+/g, '-').substr(2, 20)


export const getList = () => {
  return axios.get(`api/${channel.value._id}?timestamp=${Date.now()}`, token())
    .then(res => { list.value = res.data })
    .catch(popError)
}

export const getTopic = (id) => {
  return axios.get(`api/${channel.value._id}/${id}?timestamp=${Date.now()}`, token())
    .then(res => { topic.value = res.data })
    .catch(popError)
}

export const postTopic = () => {
  if (!draft.value) return false
  const id = idGen()
  console.log(id)
  // return axios.post(`api/${channel.value._id}/${idGen()}`, draft.value, token())
  //   .then(() => true)
  //   .catch(popError)
}
export const putTopic = () => {
  if (!draft.value || !topic.value) return false
  return axios.put(`api/${channel.value._id}/${topic.value._id}`, draft.value, token())
    .then(() => true)
    .catch(popError)
}

export const deleteComment = (id) => {
  return axios.delete(`/api/${topic.value._id}/${id}`, token())
    .then(res => {
      Swal.fire('成功', res.data, 'success')
      comments.value = comments.value.filter(a => a._id !== id)
    })
    .catch(popError)
}

export const postComment = (topic, draft) => {
  console.log(channel.value)
  return axios.post(`/api/${channel.value._id}/${topic}`, draft, token())
    .then(async res => {
      Swal.fire('成功', '', 'success')
      topic.value.comments.push(draft)
    })
    .catch(popError)
}

export const searchContent = () => {
  return axios.get(`api/topic/search/${keyword.value}`, token())
    .then(res => { result.value = res.data })
    .catch(popError)
}