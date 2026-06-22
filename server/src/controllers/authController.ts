import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { signToken } from '../utils/jwt.js'

export async function registerUser(req: Request, res: Response) {
  const { name, email, password, role, phoneNumber } = req.body ?? {}

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email, and password are required' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    phoneNumber,
  })

  const token = signToken({ id: user._id.toString(), role: user.role })

  return res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    },
  })
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' })
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = signToken({ id: user._id.toString(), role: user.role })

  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    },
  })
}