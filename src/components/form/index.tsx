import './styles.scss'
import { ReactNode } from "react";
export * from "./formButton";
export * from "./formContainer";
export * from "./formInput";
export * from "./formLabel";
export * from "./formTitle";
export * from "./formCheckBox";
export * from "./formTextArea";
export * from "./formInputImg";

interface FormProps {
  children: ReactNode;
  onSubmit?: any;
}

 function Form({children, onSubmit}:FormProps) {
  return (
    <form className="form_style" onSubmit={onSubmit}>
    {children}
    </form>
  )
}
export default Form;
