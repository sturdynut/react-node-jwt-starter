import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }
  componentDidMount() {
    const { token } = this.props;
    fetch('/api/dataz', {
      headers: {
        'content-type': 'application/json',
        'accept': '*/*',
        'authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log('dataz:response', res);
      this.setState({
        data: res
      });
    })
    .catch(err => {
      console.log('dataz:err', err);
    })
  }
  render() {
    const { token } = this.props;
    const { data } = this.state;

    return (<div className='home-container'>
      <h1>Welcome Authenticated User!</h1>
      <h2>Token: {token}</h2>
      <hr />
      <h3>Data</h3>
      <ul>
        { data && data.map(datum => <li>{datum.name}</li>)}
      </ul>
    </div>)
  }
}

export default Home;
