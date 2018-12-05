import React from 'react'
import PropTypes from 'prop-types'

import {publicaLembrete} from '../servicos'

class PublicaLembrete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      texto: ''
    }
    this.textoAlterado = this.textoAlterado.bind(this)
    this.publique = this.publique.bind(this)
  }

  textoAlterado(ev) {
    this.setState({texto: ev.target.value})
  }

  publique() {
    publicaLembrete(this.state.texto, this.props.token)
      .then(() => this.setState({texto: ''}))
      .catch(() => {
        this.setState({ texto: '' })
        this.props.onTokenInvalido()
      })
  }

  render() {
    return (
      <div className='message is-primary'>
        <div className='message-header'>Lembrete</div>
        <div className='message-body'>
          <textarea className='textarea' value={this.state.texto} onChange={this.textoAlterado}/>
          <button className='button is-success' onClick={this.publique}>Publicar</button>
        </div>
      </div>
    )
  }
}

PublicaLembrete.propTypes = {
  token: PropTypes.string.isRequired,
  onTokenInvalido: PropTypes.func.isRequired
}

export default PublicaLembrete
