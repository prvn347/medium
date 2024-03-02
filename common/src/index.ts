import { z } from "zod";


export const signupInput = z.object({
    email: z.string().email(),
    password : z.string(),
    name: z.string().optional()

})

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password : z.string()
})


export type SigninType = z.infer<typeof signinInput>;

export const contentInput = z.object({
    title: z.string(),
    content:z.string()
})
export type ContentType = z.infer<typeof contentInput>;

export const updateContent = z.object({
    title: z.string().optional(),
    content:z.string().optional()
})
export type UpdateType = z.infer<typeof updateContent>;

