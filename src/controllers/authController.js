import { authRepository } from '../repositories/authRepository.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function login(req, res, next) {
  const userInfo = req.body

  try {
    const user = await authRepository.login(userInfo.email)

    if (user.rowCount === 0)
      return res.status(401).send("Email e/ou senha incorretos")

    if (!bcrypt.compareSync(userInfo.password, user.rows[0].password))
      return res.status(401).send("Email e/ou senha incorretos")

    const token = uuid()
    await authRepository.createSession(user.rows[0].id, token)

    res.status(200).send({ token })
  } catch (error) {
    next(error)
  }
}
