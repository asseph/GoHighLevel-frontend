const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))

export const headers = {
    'Content-Type': 'application/json',
    'Authorization': currentUser?.token
  }