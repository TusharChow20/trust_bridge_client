"use client";
import React, { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function page() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="max-w-md mx-auto  items-center justify-center mt-30 px-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            placeholder="Enter your Email"
            {...register("email")}
          />
        </Field>
        <Field className={"mt-5"}>
          <FieldLabel htmlFor="input-field-username">Password</FieldLabel>
          <div className="relative flex">
            <Input
              id="input-field-username"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              {...register("password")}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 "
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff></EyeOff> : <Eye></Eye>}
            </button>
          </div>
        </Field>
        <Button className={"w-full mt-6"}>Login</Button>
      </form>

      <div className="flex justify-between items-center">
        <h1>Do not have any Account?</h1>
        <Link href={"/register"}>
          <Button className={"bg-transparent text-black text-blue-500"}>
            Register Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
