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
  pastPassWord?: null | string;
  newPassWord?: null | string;
  name?: string;
  email?: string;
}

export interface UserEyeRequest {
  leftEyeOffset: number;
  rightEyeOffset: number;
  ratio: number;
}

export interface SendCalibrationChunkPayload {
  folderId: string;
  token: string;
  eye: UserEyeRequest;
  type: "CALIBRATION_CHUNK";
  videoData: string;
}

export interface UserProfile {
  loginId?: string;
  name?: string;
  email?: string;
}
