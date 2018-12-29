
import axios from '../config/axios'


const baseUrl = process.env.NODE_ENV === 'production' ? 'https://blogapi.naice.me/api/' : 'http://127.0.0.1:3009/api/'

export const getArticle = (params) => axios.get(`${baseUrl}article`,{params})

export const getArticleId = (id) => axios.get(`${baseUrl}article/${id}`)

export const getArticleAll = () => axios.get(`${baseUrl}article/getAll`)

export const articleLike = (id) => axios.put(`${baseUrl}article/like/${id}`)

export const getTag = () => axios.get(`${baseUrl}tag`)

export const getComment = (params) => axios.get(`${baseUrl}comment/get`, {params})

export const addComment = (params) => axios.put(`${baseUrl}comment/add`, {...params})

export const commentLike = (id) => axios.post(`${baseUrl}comment/like/${id}`)

export const addReply = (params) => axios.put(`${baseUrl}reply/add`, {...params})

export const getReply = (cid) => axios.get(`${baseUrl}reply/get/${cid}`)

export const getHero = (params) => axios.get(`${baseUrl}hero/get`, {params})

export const addHero = (params) => axios.put(`${baseUrl}hero/add`, {...params})

export const addArticleLike = () => axios.put(`${baseUrl}hero/add`, {...params})

export const addCommentLike = () => axios.put(`${baseUrl}hero/add`, {...params})

export const replyCommentLike = () => axios.put(`${baseUrl}hero/add`, {...params})

export const getProject = (params) => axios.get(`${baseUrl}project`, {params})
