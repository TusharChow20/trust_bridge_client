"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const CATEGORIES = [
  "Electronics",
  "Sports",
  "Clothing",
  "Books",
  "Home & Garden",
  "Vehicles",
  "Furniture",
  "Toys",
  "Other",
];
const CONDITIONS = ["New", "Like New", "Used", "For Parts"];

export default function SellItems() {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      condition: "",
      location: "",
      sellerName: "",
      sellerPhone: "",
      image: "",
      status: "available",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  // Handle image file upload later
  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImagePreview(dataUrl);
      form.setValue("image", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Handle paste (image or URL) current
  const handleImagePaste = (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          handleImageFile(file);
          return;
        }
      }
    }
    // If no image blob, let the text paste happen (URL)
    setTimeout(() => {
      const val = form.getValues("image");
      if (val && val.startsWith("http")) {
        setImagePreview(val);
      }
    }, 0);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    form.setValue("image", url);
    if (url.startsWith("http")) {
      setImagePreview(url);
    } else if (!url) {
      setImagePreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleImageFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="min-h-screen flex items-center justify-center  py-10 px-4">
      <Card className="w-full max-w-2xl ">
        <CardHeader className=" pb-4">
          <CardTitle className="text-2xl font-bold text-green-900">
            List an Item for Sale
          </CardTitle>
          <CardDescription className="text-green-700">
            Fill in the details below to post your product listing.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form id="sell-item-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Product Title</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="e.g. Roadmaster Bicycle"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={form.control}
                rules={{
                  required: "Description is required",
                  maxLength: { value: 500, message: "Max 500 characters" },
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="description"
                        placeholder="Describe your item — condition, features, reason for selling..."
                        rows={4}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums text-xs text-green-600">
                          {field.value.length}/500 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Include key features and any defects.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Price + Category (side by side) */}
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="price"
                  control={form.control}
                  rules={{
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="price">Price (BDT ৳)</FieldLabel>
                      <Input
                        {...field}
                        id="price"
                        type="number"
                        placeholder="e.g. 8500"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="category"
                  control={form.control}
                  rules={{ required: "Category is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="category">Category</FieldLabel>
                      <select
                        {...field}
                        id="category"
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 "
                        aria-invalid={fieldState.invalid}
                      >
                        <option value="">Select category</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Condition + Status */}
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="condition"
                  control={form.control}
                  rules={{ required: "Condition is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="condition">Condition</FieldLabel>
                      <select
                        {...field}
                        id="condition"
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 "
                        aria-invalid={fieldState.invalid}
                      >
                        <option value="">Select condition</option>
                        {CONDITIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="status">Status</FieldLabel>
                      <select
                        {...field}
                        id="status"
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 "
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="reserved">Reserved</option>
                      </select>
                    </Field>
                  )}
                />
              </div>

              {/* Location */}
              <Controller
                name="location"
                control={form.control}
                rules={{ required: "Location is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="location">Location</FieldLabel>
                    <Input
                      {...field}
                      id="location"
                      placeholder="e.g. Chittagong, Bangladesh"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Seller Name + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="sellerName"
                  control={form.control}
                  rules={{ required: "Seller name is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="sellerName">Seller Name</FieldLabel>
                      <Input
                        {...field}
                        id="sellerName"
                        placeholder="e.g. Rifat Islam"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="sellerPhone"
                  control={form.control}
                  rules={{ required: "Phone is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="sellerPhone">
                        Seller Phone
                      </FieldLabel>
                      <Input
                        {...field}
                        id="sellerPhone"
                        type="tel"
                        placeholder="e.g. 01411112222"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Image Upload / Paste / URL */}
              <Field>
                <FieldLabel>Product Image</FieldLabel>

                {/* Drop zone */}
                <div
                  className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center cursor-pointer hover:bg-green-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-md object-contain"
                        onError={() => setImagePreview(null)}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          form.setValue("image", "");
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-green-500 text-sm py-4">
                      <div className="text-3xl mb-2">📷</div>
                      <p className="font-medium">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        PNG, JPG, WEBP supported
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageFile(e.target.files?.[0])}
                />

                {/* URL / Paste input */}
                <div className="mt-2">
                  <Controller
                    name="image"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Or paste an image URL here..."
                        onPaste={handleImagePaste}
                        onChange={handleImageUrlChange}
                        className="text-xs"
                      />
                    )}
                  />
                </div>
                <FieldDescription>
                  Upload a file, drag & drop, paste an image (Ctrl+V), or enter
                  a URL.
                  {/* will do iiCloudinary upload integration */}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="border-t border-green-100 pt-4">
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setImagePreview(null);
              }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="sell-item-form"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Post Listing
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
