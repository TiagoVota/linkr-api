import { userRepository } from '../repositories/userRepository.js'
import bcrypt from 'bcrypt'

export async function signUp(req, res, next) {
  const user = req.body

  try {
    const emailRegistered = await userRepository.searchEmail(user.email)
    if (emailRegistered !== 0)
      return res.status(409).send('Email is already taken')

    const usernameRegistered = await userRepository.searchUsername(user.username)
    if (usernameRegistered !== 0)
      return res.status(409).send('Username is already taken')

    const password = bcrypt.hashSync(user.password, 10)

    const newUser = {
      ...user,
      password
    }

    await userRepository.signUp(newUser)

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}

export async function getUserPosts(req, res, next) {
  const { id } = req.params

  try {
    const user = await userRepository.findUser(id)

    if (!user) return res.sendStatus(404)

    const userPosts = await userRepository.getUserPosts(id)

    return res.status(200).send(userPosts)

  } catch (error) {
    next(error)
  }
}