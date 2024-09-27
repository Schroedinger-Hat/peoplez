import { create } from "zustand"

interface SignUpState {
  name: string
  surname: string
  email: string
  socialSecurityNumber: string
}

export const useSignUpStore = create<SignUpState>((set) => ({
  email: "",
  name: "",
  setEmail: (email: string) => set(() => ({ email: email })),
  setName: (name: string) => set(() => ({ name: name })),
  setSocialSecurityNumber: (socialSecurityNumber: string) =>
    set(() => ({ socialSecurityNumber: socialSecurityNumber })),
  setSurname: (surname: string) => set(() => ({ surname: surname })),
  socialSecurityNumber: "",
  surname: "",
}))
