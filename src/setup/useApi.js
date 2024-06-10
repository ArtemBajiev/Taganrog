export default function useApi() {
  const api = 'http://api.taganrog.custom-development-team.su/api/'
  const Token = 'Bearer' + ' ' + localStorage.getItem('Token')
  const paramsImg = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: Token
    }
  }
  const params = {
    headers: {
      Authorization: Token
    }
  }
  return {
    api,
    params,
    Token,
    paramsImg
  }
}
