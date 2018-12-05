import React from 'react'
import PropTypes from 'prop-types'

import { leLembretes, apagaLembrete } from '../servicos'
import Lembrete from './Lembrete.jsx'

class MostraLembretes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lembretes: undefined
    }

    this.leiaLembretes = this.leiaLembretes.bind(this)
    this.apagueLembrete = this.apagueLembrete.bind(this)
  }

  apagueLembrete(ev) {
    const idLembrete = ev.target.dataset.id
    apagaLembrete(this.props.token, idLembrete)
      .then(() => {
        const lembs = this.state.lembretes.filter(lemb => lemb._id !== idLembrete)
        this.setState({lembretes: lembs})
      })
      .catch(() => {
        this.setState({ lembretes: undefined })
        this.props.onTokenInvalido()
      })
  }

  leiaLembretes() {
    leLembretes(this.props.token)
      .then(lembretes => this.setState({lembretes}))
      .catch(() => {
        this.setState({ lembretes: undefined })
        this.props.onTokenInvalido()
      })
  }
  render() {
    return (
      <div className='message'>
        <div className='message-header'>Mostrar Lembretes
          <button className='button is-info' onClick={this.leiaLembretes}>Ler Lembretes</button>
        </div>
        {
          this.state.lembretes !== undefined &&
          <div>
            {this.state.lembretes.map(l =>
              <span key={l._id}>
                <Lembrete id={l._id}
                  texto={l.texto}
                  onDelete={this.apagueLembrete}/>
              </span>)}
          </div>
        }
        {
          this.state.lembretes !== undefined &&
          this.state.lembretes.length == 0 &&
          <div className='notification is-warning'>Não há lembretes para este usuário.</div>
        }
      </div>
    )
  }
}

MostraLembretes.propTypes = {
  token: PropTypes.string.isRequired,
  onTokenInvalido: PropTypes.func.isRequired
}

export default MostraLembretes
