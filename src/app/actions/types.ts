export interface ErrorItem {
  code?: number
  message: string
}

export interface ServerActionState {
  status: ServerActionStatus
  payload?: object
  nextStep?: string
  errors?: ErrorItem[]
}

export enum ServerActionStatus {
  Success = "success",
  Error = "error",
  Pending = "pending",
}

export const InitialServerActionState = {
  payload: {},
  status: ServerActionStatus.Pending,
};
