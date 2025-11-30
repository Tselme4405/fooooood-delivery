"use client";

import { useState } from "react";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Mail({ value, onChange }) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      setError("Please enter a valid email");
    } else {
      setError("");
    }
  };

  return (
    <Field>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email address"
        required
        value={value}
        onChange={handleChange}
      />
      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
