export type AuthType = {
  email: string
  password: string
}

export interface UserResponseType{
  tokens: {
     accessToken: string
     refreshToken: string
  } ,
  user:{
    isActivated: boolean,   
    email: string
    role: string
    userId: number
  }

}