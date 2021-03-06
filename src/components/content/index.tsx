import { ReactNode } from 'react';
import './styles.scss';
interface ContentProps {
    children: ReactNode;
  }

export function Content({children}: ContentProps) {
    return(
    <div className="div_container">
        {children}
    </div>
    )
}