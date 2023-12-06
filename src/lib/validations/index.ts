import * as z from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2, {message: 'Name must be at least 2 characters'}),
    username: z.string().min(2, {message: "Username must be at least 2 characters"}),
    email: z.string().email({message: "Please enter a Valid Email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
  })

export const SigninValidationSchema = z.object({
    email: z.string().email({message: "Please enter a Valid Email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
  })


export const PostValidationSchema = z.object({
    caption: z.string().min(5, {message: "Caption must be at least 5 characters"}).max(2200, {message: "Caption cannot exceed 2200 characters"}),
    file: z.custom<File[]>(),
    location: z.string().min(2, {message: "Location must be at least 2 characters"}).max(100, {message: "Location cannot exceed 100 characters"}),
    tags: z.string()
  })
