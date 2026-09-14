"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// using zod validation
const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" }),
  full_name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" }),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
})

export function RegisterFormComponent() {
  const router = useRouter()

  // using react hook form
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      full_name: "",
      email: "",
      password: "",
    },
  })

  // logic with form
  function onSubmit(data: z.infer<typeof registerSchema>) {
    const postData = async () => {
      try {
        const res = await fetch("https://sombobaeb.cheat.casa/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (res.ok) {
          toast.success("Account created successfully!")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        } else {
          const errorData = await res.json().catch(() => null)
          toast.error(errorData?.message || "Registration failed. Please try again.")
        }
      } catch (error) {
        toast.error("Network error. Please try again.")
      }
    }

    postData()
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <Toaster />
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Username Field */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="senghak"
                    autoComplete="username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Full Name Field */}
            <Controller
              name="full_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-full-name">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-full-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Men Senghak"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="register-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="hak12@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="register-password"
                    placeholder="P@ssw0rd123"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="register-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}