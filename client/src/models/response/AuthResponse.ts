import { iUser } from "./iUser"

export interface AuthResponse {
  tokens:{
  accessToken: string
  refreshToken: string
  }  
  user: iUser
}