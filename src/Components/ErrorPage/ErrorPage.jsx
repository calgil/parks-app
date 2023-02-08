import s from "./ErrorPage.module.css";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={s.errorPage}>
      <h1 className={s.errorHeader}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <a className={s.homeLink} href="/">
        Return Home
      </a>
    </div>
  );
}
