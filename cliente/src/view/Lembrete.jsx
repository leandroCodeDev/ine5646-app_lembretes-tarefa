import React from 'react'
import PropTypes from 'prop-types'

class Lembrete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostrando: false,
      textoBotao : this.obtenhaTexto(this.props.texto)
    }
    this.exibaOuOculte = this.exibaOuOculte.bind(this)
  }

  obtenhaTexto(texto) {
    return `${texto.substring(0,10)}...`
  }

  exibaOuOculte() {
    this.setState(prevState => ({
      mostrando: !prevState.mostrando,
      textoBotao: prevState.mostrando ?
        this.obtenhaTexto(this.props.texto) :
        'Ocultar'
    }))
  }

  render() {
    let conteudo

    if (this.state.mostrando) {
      conteudo =
        <div className='notification is-info'>
          <textarea className='textarea' readOnly value={this.props.texto}/>
          <button className='button is-link' onClick={this.exibaOuOculte}>{this.state.textoBotao}</button>
          <button className='button is-danger'
            data-id={this.props.id}
            onClick={this.props.onDelete}>Apagar</button>
        </div>
    } else {
      conteudo =
          <button className='button is-link is-rounded' onClick={this.exibaOuOculte}>
            {this.state.textoBotao}
          </button>
    }
    return (
      <span>{conteudo}</span>
    )
  }
}

Lembrete.propTypes = {
  id: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Lembrete
