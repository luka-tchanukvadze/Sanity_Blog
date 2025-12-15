import { redirect } from "react-router-dom";

const DEFAULT_LANGUAGE = "en";

export async function loader() {
  return redirect(`/${DEFAULT_LANGUAGE}`);
}

export default function RedirectToDefaultLang() {
  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Redirecting...</h1>
      <p>
        If you are not redirected automatically, please visit{" "}
        <a href={`/${DEFAULT_LANGUAGE}`}>{`/${DEFAULT_LANGUAGE}`}</a>
      </p>
    </main>
  );
}
