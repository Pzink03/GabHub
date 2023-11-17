export function checkEmail(email: string): string[] {
  const errors: string[] = []

  if (email.length === 0) {
    errors.push("Required")
  }

  return errors
}

export function checkPassword(password: string): string[] {
  const errors: string[] = []

  if (password.length < 10) {
    errors.push("Must be at least 10 characters")
  }

  if (!password.match(/[a-z]/)) {
    errors.push("Must include at least 1 lowercase letter")
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Must include at least 1 uppercase letter")
  }

  if (!password.match(/[0-9]/)) {
    errors.push("Must include at least 1 number")
  }

  return errors
}

export function checkName(name: string): string[] {
  const errors: string[] = []

  if (name.length === 0) {
    errors.push("Required")
  }

  return errors
}

export function checkUsername(username: string): string[] {
  const errors: string[] = []

  if (username.length === 0) {
    errors.push("Required")
  }

  return errors
}

export function checkCaption(caption: string): string[] {
  const errors: string[] = []

  if (caption.length === 0) {
    errors.push("Required")
  }

  return errors
}
