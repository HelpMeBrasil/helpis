import { ReactNode } from 'react';
import './style.scss';

interface formContainerProps {
  children: ReactNode;
}

export function FormContainer({children}: formContainerProps) {

  return(
    <div className="form_container">
      {children}
    </div>
  )
}
