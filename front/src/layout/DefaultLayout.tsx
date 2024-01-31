import { Link } from "react-router-dom";
import React from "react";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio de sesión</Link>
            </li>
            <li>
              <Link to="/signup">Crear cuenta</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
