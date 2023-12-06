export function checkCaption(caption: string): string[] {
  const errors: string[] = []

  if (caption.length === 0) {
    errors.push("Required")
  }

  return errors
}
