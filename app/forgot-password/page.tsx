"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Zap, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!email.trim()) newErrors.email = "Email is required"
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setStep(2)
    }
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!code.trim()) newErrors.code = "Verification code is required"
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setStep(3)
    }
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!newPassword) newErrors.newPassword = "Password is required"
    if (newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters"
    if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setStep(4)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">StellarPay</span>
        </Link>

        <Card className="p-8 border-primary/10">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-2">Reset Password</h1>
              <p className="text-muted-foreground mb-6">Enter your email to receive a reset code</p>

              <form onSubmit={handleRequestReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors({})
                    }}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                  Send Reset Code
                </Button>
              </form>

              <Link
                href="/login"
                className="flex items-center gap-2 justify-center text-sm text-primary hover:underline mt-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-2">Verify Code</h1>
              <p className="text-muted-foreground mb-6">Enter the code sent to {email}</p>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Verification Code</label>
                  <Input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      if (errors.code) setErrors({})
                    }}
                  />
                  {errors.code && <p className="text-xs text-destructive mt-1">{errors.code}</p>}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                  Verify Code
                </Button>
              </form>

              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 justify-center text-sm text-primary hover:underline mt-6 w-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-2">New Password</h1>
              <p className="text-muted-foreground mb-6">Create a new password for your account</p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      if (errors.newPassword) setErrors({})
                    }}
                  />
                  {errors.newPassword && <p className="text-xs text-destructive mt-1">{errors.newPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword) setErrors({})
                    }}
                  />
                  {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                  Reset Password
                </Button>
              </form>

              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 justify-center text-sm text-primary hover:underline mt-6 w-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </>
          )}

          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Password Reset!</h1>
                <p className="text-muted-foreground">Your password has been successfully reset</p>
              </div>
              <Link href="/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">Sign In</Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
