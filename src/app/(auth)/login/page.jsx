"use client";
import React from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function page() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
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
          <Input
            id="input-field-username"
            type="password"
            placeholder="Enter your Password"
            {...register("password")}
          />
        </Field>
        <Button className={"w-full mt-6"}>Login</Button>
      </form>
    </div>
  );
}
