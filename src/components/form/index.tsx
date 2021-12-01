import { FormEvent, ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent) => Promise<void>;
}

export function Form({children, onSubmit}:FormProps) {
  return (
    <form className="form_style" onSubmit={onSubmit}>
    {children}
    </form>
  )
}