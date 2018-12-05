import React from 'react'
import jwt from 'jsonwebtoken'

import Login from './Login.jsx'
import PublicaLembrete from './PublicaLembrete.jsx'
import MostraLembretes from './MostraLembretes.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    let token = window.localStorage.getItem('token')
    let tokenDecodificado

    if (token === null)
      token = undefined
    else
      tokenDecodificado = jwt.decode(token)
    this.state = {
      token,
      tokenDecodificado
    }

    this.recebaToken = this.recebaToken.bind(this)
    this.usuarioSaiu = this.usuarioSaiu.bind(this)
  }

  recebaToken(token) {
    const tokenDecodificado = jwt.decode(token)
    this.setState({token, tokenDecodificado})
    window.localStorage.setItem('token', token)
  }

  usuarioSaiu() {
    this.setState({token: undefined, tokenDecodificado: undefined})
    window.localStorage.removeItem('token')
  }

  render() {
    return (
      <div className='container is-fluid'>
        <div className='message'>
          <div className='message-header'>
            INE5646 - App lembretes
          </div>
          <div className='message-body'>
            <Login onToken={this.recebaToken}
              onSaiu={this.usuarioSaiu}
              token={this.state.token}
              tokenDecodificado={this.state.tokenDecodificado}/>
            {
              this.state.token &&
              <PublicaLembrete token={this.state.token}
                onTokenInvalido={this.usuarioSaiu}/>
            }
            {
              this.state.token &&
              <MostraLembretes token={this.state.token}
                onTokenInvalido={this.usuarioSaiu}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
