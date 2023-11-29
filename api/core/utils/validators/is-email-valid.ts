const emailRegex = /[A-Za-z0-9]*@[A-Za-z0-9]*\.[A-Za-z0-9]*/i

export const isEmailValid = (email: string) => emailRegex.test(email);
