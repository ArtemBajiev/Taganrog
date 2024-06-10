import axios from 'axios'
import useApi from './useApi'
export default function places() {
  const { api, params, paramsImg } = useApi()
  function getPlaces() {
    return axios.get(api + 'places')
  }
  function getPlace(placeId) {
    return axios.get(api + 'place', { params: { placeId } })
  }
  function getTypePlaces(typeId) {
    return axios.get(api + 'places/type', { params: { typeId } })
  }
  function getType() {
    return axios.get(api + 'types ')
  }
  function placeCreate(name, descr, location_x, location_y, location_address, type_id) {
    return axios.post(
      api + 'place/create',
      { name, descr, location_x, location_y, location_address, type_id },
      params
    )
  }
  function placeEdit(name, descr, location_x, location_y, location_address, type_id, placeId) {
    return axios.post(
      api + 'place/edit',
      { name, descr, location_x, location_y, location_address, type_id, placeId },
      params
    )
  }
  function addType(name) {
    return axios.post(api + 'type/create', { name }, params)
  }
  function addImage(image, placeId) {
    return axios.post(api + 'place/upload/image', { image, placeId }, paramsImg)
  }

  return {
    getPlaces,
    getPlace,
    getTypePlaces,
    getType,
    placeCreate,
    placeEdit,
    addType,
    addImage
  }
}
