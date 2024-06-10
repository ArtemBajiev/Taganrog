import axios from 'axios'
import useApi from './useApi'

export default function user() {
  const { api, params, paramsImg } = useApi()

  function addImageUser(avatar) {
    return axios.post(api + 'user/upload/avatar', { avatar }, paramsImg)
  }
  function getUser() {
    return axios.get(api + 'user', params)
  }
  function addFavorite(placeId) {
    return axios.post(api + 'favorite/add', { placeId }, params)
  }
  function delFavorite(placeId) {
    return axios.post(api + 'favorite/delete', { placeId }, params)
  }
  function editUser(name, surname, patronymic, birthday, gender, city, phone) {
    return axios.post(
      api + 'user/edit',
      {
        name,
        surname,
        patronymic,
        birthday,
        gender,
        city,
        phone
      },
      params
    )
  }
  return {
    getUser,
    editUser,
    addFavorite,
    delFavorite,
    addImageUser
  }
}
