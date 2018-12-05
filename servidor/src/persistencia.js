/* eslint-disable no-console */
import MongoClient from 'mongodb'
//FIXME Descomente para importar o módulo crypto
//import crypto from 'crypto'

const BD_URL = process.env.BD_URL
let client
let db

(async function () {
  try {
    client = await MongoClient.connect(BD_URL, { useNewUrlParser: true })
    db = client.db()
    console.log('conectou com o banco...')
    process.on('SIGINT', () => {
      client.close()
      console.log('desconectou do banco...')
      process.exit()
    })
  } catch (e) {
    console.log(e)
    console.log('não conseguiu conexão com o banco')
    process.exit(1)
  }
})()

function criptografaSenha (senha) {
  //FIXME Use o método scryptSync definido no módulo crypto do Node para
  // criptografar a senha informada pelo usuário. Consulte a documentação do Node.
  return senha
}

const COL_USUARIOS = 'usuarios'
const COL_LEMBRETES = 'lembretes'

async function leUsuario (login) {
  const col = db.collection(COL_USUARIOS)
  const usuario = await col.findOne({ login })
  if (usuario) {
    return usuario
  } else {
    return null
  }
}

async function cadastraUsuario (login, senha) {
  const usuario = await leUsuario(login)
  if (usuario !== null) {
    return false
  } else {
    const col = db.collection(COL_USUARIOS)
    await col.insertOne({ login, senha })
    return true
  }
}

async function registraLembrete (login, texto) {
  const col = db.collection(COL_LEMBRETES)
  const resultado = await col.insertOne({ login, texto })
  return resultado.insertedId
}

async function leLembretes (login) {
  const col = db.collection(COL_LEMBRETES)
  const resultado = await col.find({ login })
  const resultadoComoArray = await resultado.toArray()
  return resultadoComoArray
}

async function apagaLembrete (idLembrete) {
  const col = db.collection(COL_LEMBRETES)
  const r = await col.deleteOne({ _id: new MongoClient.ObjectId(idLembrete) })
  if (r.deletedCount === 0) {
    throw new Error('não conseguiu remover lembrete')
  }
  return true
}

export {
  leUsuario, cadastraUsuario,
  registraLembrete, leLembretes,
  apagaLembrete, criptografaSenha }
