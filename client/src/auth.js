function auth(username, password) {
  return new Promise((resolve, reject) => {
    const body = {
      username: username,
      password: password
    };
  
    fetch('/api/auth', {
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        'accept': '*/*'
      },
      method: 'POST'
    })
    .then(res => res.json())
    .then(res => {
      console.log('auth:response', res);
      resolve(res);
    })
    .catch(err => {
      console.log('auth:err', err);
      reject(err);
    })
  })
}

export default auth;