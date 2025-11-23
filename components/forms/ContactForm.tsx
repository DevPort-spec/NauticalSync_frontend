"use client"
import { useAppStore } from "@/lib/store" // OR "../../lib/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// --- TRICKY PART: THE IMPORT ---
// Try this relative path first. 
// If your 'schemas' folder is in the root, use "../../schemas/contact-schema"
// If you are using src/, use "@/schemas/contact-schema"


// UI Components (These come from shadcn)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { contactFormSchema } from "@/schema/contact-schema"

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  // 1. Define your form.
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(data: ContactFormValues) {
    console.log("Submitted Data:", data)
    alert("Form submitted! Check the console.")
  }
const increment = useAppStore((state) => state.incrementCount)
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur shadow-lg rounded-xl border border-slate-200">
        <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="text-slate-500">Send us a message directly.</p>
        </div>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Subject Field */}
            <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                    <Input placeholder="Project Inquiry..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Message Field */}
            <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                    <Textarea 
                        placeholder="Tell us about your project..." 
                        className="min-h-[120px]" 
                        {...field} 
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" className="w-full">
            Send Message
            </Button>
        </form>
        </Form>
    </div>
  )
}