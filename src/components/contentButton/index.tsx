import { ReactNode } from 'react';
import './styles.scss';
interface ContentProps {
    children: ReactNode;
  }

export function ContentButton({children}: ContentProps) {
    return(
    <div className="div_containerButton">
        {children}
    </div>
    )
}