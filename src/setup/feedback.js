import axios from 'axios'
import useApi from './useApi'
export default function places() {
  const { api, params, paramsImg } = useApi()

  function getFeedback(placeId) {
    return axios.get(api + 'feedback/place', { params: { placeId } })
  }
  function addImageFid(image, feedbackId) {
    return axios.post(api + 'feedback/upload/image', { image, feedbackId }, paramsImg)
  }
  function createFeedback(text, place_id, score) {
    return axios.post(
      api + 'feedback/create',
      {
        text,
        place_id,
        score
      },
      params
    )
  }
  function delFeedback(feedbackId) {
    return axios.post(
      api + 'feedback/delete',
      {
        feedbackId
      },
      params
    )
  }

  return {
    getFeedback,
    createFeedback,
    addImageFid,
    delFeedback
  }
}
