import jwt from 'jsonwebtoken'

const SENHA = process.env.SENHA_JWT
const DURACAO = process.env.DURACAO_JWT

function geraToken (login) {
  return jwt.sign({ login }, SENHA, { expiresIn: DURACAO })
}

function validaToken (token) {
  try {
    const dados = jwt.verify(token, SENHA)
    return dados
  } catch (e) {
    return null
  }
}

export { geraToken, validaToken }
