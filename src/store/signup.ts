import {create} from "zustand";

interface SignUpState {
    name: string
    surname: string
    email: string
    socialSecurityNumber: string
}

export const useSignUpStore = create<SignUpState>(set => ({
    name: "",
    surname: "",
    email: "",
    socialSecurityNumber: "",
    setName: (name: string) => set(() => ({name: name})),
    setSurname: (surname: string) => set(() => ({surname: surname})),
    setEmail: (email: string) => set(() => ({email: email})),
    setSocialSecurityNumber: (socialSecurityNumber: string) => set(() => ({socialSecurityNumber: socialSecurityNumber})),
}))