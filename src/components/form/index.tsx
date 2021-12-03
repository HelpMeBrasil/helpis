import './styles.scss'
import { FormEvent, ReactNode } from "react";
export * from "./formButton";
export * from "./formContainer";
export * from "./formInput";
export * from "./formLabel";
export * from "./formTitle";
export * from "./formCheckBox";

interface FormProps {
  children: ReactNode;
  onSubmit?: (event: FormEvent) => Promise<void>;
}

 function Form({children, onSubmit}:FormProps) {
  return (
    <form className="form_style" onSubmit={onSubmit}>
    {children}
    </form>
  )
}
export default Form;
