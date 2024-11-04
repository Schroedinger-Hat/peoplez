// app/404/page.tsx
import Link from "next/link";

export default function Custom404() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Pagina non trovata</h1>
      <p>Spiacenti, la pagina che stai cercando non esiste.</p>
      <Link href="/">
        <a style={{ color: "blue" }}>Torna alla homepage</a>
      </Link>
    </div>
  );
}
