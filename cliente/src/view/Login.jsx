import React from 'react'
import PropTypes from 'prop-types'

import * as s from '../servicos'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      senha: '',
      confereSenha: '',
      novoUsuario: false,
      nomeBotao: 'Entrar',
      msg: undefined,
    }
    this.login = this.login.bind(this)
    this.senha = this.senha.bind(this)
    this.facaLoginOuCadastro = this.facaLoginOuCadastro.bind(this)
    this.facaLogout = this.facaLogout.bind(this)
    this.novoUsuario = this.novoUsuario.bind(this)
    this.confereSenha = this.confereSenha.bind(this)
  }

  login(ev) {
    this.setState({login: ev.target.value, senha: '', confereSenha: '', msg: undefined})
  }

  senha(ev) {
    this.setState({senha: ev.target.value, msg: undefined})
  }

  confereSenha(ev) {
    this.setState({confereSenha: ev.target.value, msg: undefined})
  }

  novoUsuario() {
    const novoUsuario = !this.state.novoUsuario
    const nomeBotao = novoUsuario ? 'Cadastrar Novo Usuário' : 'Entrar'

    this.setState({novoUsuario, nomeBotao, msg: undefined})
  }

  facaLoginOuCadastro() {
    if (this.state.login === '')
      this.setState({msg: 'Login não definido.'})
    else if (this.state.novoUsuario) {
      if (this.state.senha === '' || this.state.confereSenha === '')
        this.setState({msg: 'Senha não definida.'})
      else if (this.state.senha !== this.state.confereSenha)
        this.setState({msg: 'Senhas não são iguais.'})
      else {
        s.fazCadastro(this.state.login, this.state.senha)
          .then(token => {
            this.props.onToken(token)
            this.setState({msg: undefined})
          })
          .catch(erro => this.setState({msg: erro.message}))
        this.setState({msg: 'Fazendo cadastro...'})
      }
    } else if (this.state.senha === '')
      this.setState({msg: 'Senha não definida'})
    else {
      s.fazLogin(this.state.login, this.state.senha)
        .then(token => {
          this.props.onToken(token)
          this.setState({msg: undefined})
        })
        .catch(erro => this.setState({msg: erro.message}))
      this.setState({msg: 'Fazendo login...'})
    }
  }

  facaLogout() {
    this.setState(
      {
        login: '',
        senha: '',
        confereSenha: '',
        novoUsuario: false,
        nomeBotao: 'Entrar',
        msg: undefined,
      })
    this.props.onSaiu()
  }

  render() {
    let conteudo
    if (this.props.token === undefined) {
      conteudo =
        <div className='message is-link'>
          <div className='message-header'>Login</div>
          <div className='message-body'>

            <label className='checkbox'>
              <input type='checkbox'
                value={this.state.novoUsuario}
                onChange={this.novoUsuario}/>novo usuário
            </label>
            <div className='field'>
              <label className='label'>Login</label>
              <div className='control'>
                <input className='input' type='text'
                  value={this.state.login} onChange={this.login}/>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Senha</label>
              <div className='control'>
                <input className='input' type='password'
                  value={this.state.senha}
                  onChange={this.senha}/>
              </div>
            </div>
            {
              this.state.novoUsuario &&
            <div className='field'>
              <label className='label'>Repita Senha</label>
              <div className='control'>
                <input className='input' type='password'
                  value={this.state.confereSenha}
                  onChange={this.confereSenha}/>
              </div>
            </div>
            }
            <br/>
            <button className='button is-link' onClick={this.facaLoginOuCadastro}>
              {this.state.nomeBotao}
            </button>
            {
              this.state.msg &&
            <div className='notification is-warning'>{this.state.msg}</div>
            }
          </div>
        </div>
    } else {
      conteudo =
        <div className='message is-info'>
          <div className='message-header'>
            Usuário logado: {this.props.tokenDecodificado.login}
          </div>
          <div className='message-body'>
            <button className='button is-link' onClick={this.facaLogout}>Sair</button>
          </div>
        </div>
    }

    return (
      <div>
        {conteudo}
      </div>
    )
  }
}

Login.propTypes = {
  onToken: PropTypes.func.isRequired,
  onSaiu: PropTypes.func.isRequired,
  token: PropTypes.string,
  tokenDecodificado: PropTypes.object
}


export default Login
