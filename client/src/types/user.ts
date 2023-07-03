export type AuthType = {
  email: string
  password: string
}

export type UserResponseType = {
  accessToken: string
  refreshToken: string
  user:{
    activationLink: string
    email: string
    role: string
    userId: number
  }

}