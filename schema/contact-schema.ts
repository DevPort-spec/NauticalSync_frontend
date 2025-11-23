import { z } from "zod"

export const contactFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid professional email." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be detailed (min 10 chars)." }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>