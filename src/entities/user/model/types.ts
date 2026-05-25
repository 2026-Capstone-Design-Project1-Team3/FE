export interface SignUpRequest {
  loginId: string;
  passWord: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  loginId: string;
  passWord: string;
}

export interface UpdateUserRequest {
  pastPassWord?: string;
  newPassWord?: string;
  name?: string;
  email?: string;
}

export interface UserEyeRequest {
  userId?: string;
  leftEyeOffset?: number;
  rightEyeOffset?: number;
  ratio?: number;
}

export interface UserProfile {
  loginId?: string;
  name?: string;
  email?: string;
}
