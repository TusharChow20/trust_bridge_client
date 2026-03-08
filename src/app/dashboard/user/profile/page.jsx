"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Check,
  Loader2,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function ProfileUpdateForm() {
  const { data: sessions } = useSession();
  const user = sessions?.user;
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = async (data) => {
    const response = await axiosInstance.patch("/updateUser", {
      ...data,
      email: sessions?.user?.email,
    });
    setSaved(true);
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      icon: User,
      placeholder: sessions?.user?.name,
      rules: { required: "Name is required" },
    },
    {
      name: "email",
      label: "Email",
      icon: Mail,
      placeholder: sessions?.user?.email,
      disabled: true,
    },
  ];

  return (
    <div className="max-w-xl w-full mx-auto py-10 px-4">
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative group cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border">
            <User className="w-7 h-7 text-muted-foreground" />
          </div>
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">{user?.name ?? "Your Name"}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map(
          ({ name, label, icon: Icon, placeholder, rules, disabled }) => (
            <div key={name} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {label}
              </label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  {...register(name, rules)}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={() => setSaved(false)}
                  className={`w-full pl-9 pr-3 py-2 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 transition
                  ${errors[name] ? "border-destructive focus:ring-destructive/30" : "focus:ring-ring"}`}
                />
              </div>
              {errors[name] && (
                <p className="text-xs text-destructive">
                  {errors[name].message}
                </p>
              )}
            </div>
          ),
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60 transition hover:opacity-90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving
              </>
            ) : saved ? (
              <>
                <Check className="w-4 h-4" /> Saved
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
