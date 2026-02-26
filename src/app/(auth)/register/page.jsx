"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);

    const response = await axiosInstance.post("/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return response;
  };
  return (
    <div className="max-w-xl mx-auto mt-30 p-5 border rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field className={"mt-3"}>
          <FieldLabel htmlFor="input-required">
            Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="input-required"
            placeholder="Place Your Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="input-required">
            Email <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="input-required"
            placeholder="Place Your Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </Field>
        <Field className={"mt-3"}>
          <FieldLabel htmlFor="input-required">
            Password <span className="text-destructive">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              id="input-required"
              type={showPassword ? "text" : "password"}
              placeholder="Place Your Password"
              {...register("password", { required: true })}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-3  mt-2"
            >
              {showPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </Field>

        <Field className={"mt-3"}>
          <FieldLabel htmlFor="input-required">
            Confirm Password <span className="text-destructive">*</span>
          </FieldLabel>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="input-required"
              placeholder="Confirm Your Password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-3  mt-2"
            >
              {showPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message || "This field is required"}
            </span>
          )}
        </Field>
        <Button
          type="submit"
          className={"mt-3 w-full bg-green-200 text-black hover:bg-green-400"}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
