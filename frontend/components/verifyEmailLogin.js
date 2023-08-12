import styles from "./login.module.css";
import { setIsLoggedIn } from "../redux/slices/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loginFetch, confirmSignup } from "../services/backendService";
import { handleShowVerifyEmailLogin } from "../redux/slices/componentSlice";
import { onLostFocus } from "../services/inputService";
import translate from "../languages/translate";
import LoadingIcon from "./loadingIcons/LoadingIcon";
import Image from "next/image";

export default function VerifyEmailLogin() {
  const dispatch = useDispatch();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailNotice = useSelector((state) => {
    return state.placeBid.displayEmailNotice;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = translate.fromSpecific(languageToUse);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const elements = e.target.elements;
    const data = {};

    data.verifyEmailBody = {
      email: elements.email.value,
      password: elements.password.value,
      confirmationCode: new URLSearchParams(window.location.search).get("code"),
    };
    data.loginBody = {
      email: elements.email.value,
      password: elements.password.value,
    };
    verifyEmailRequest(data);
  };

  async function verifyEmailRequest(data) {
    console.log(data);
    try {
      const result = await confirmSignup(data.verifyEmailBody);
      console.log(result.msg);

      if (!result.success && !result.userEmailAlreadyVerified) {
        //Client error handling here.. Show msg, retry?
        setWrongCredentials(true);
        setIsLoading(false);
        return;
      }
      //If success verifying email..
      loginRequest(data.loginBody);
      window.location.href = "/";
    } catch (e) {
      console.log(e);
    }
  }

  async function loginRequest(data) {
    try {
      const result = await loginFetch(data);
      console.log(result);
      if (result.status) {
        setIsLoading(false);
        dispatch(setIsLoggedIn(true));
        handleShowVerifyEmailLogin(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className={styles.header}>
        <Image
          alt="PlotEye Logo"
          src="/logo_ploteye.svg"
          intrinsic
          width="200"
          height="150"></Image>
      </h1>

      <div className="component-frame">
        <div className={styles.headerFrame}>
          <h1 className={styles.componentHeader}>
            {translations.verifyYourMailHeader}
          </h1>
          {emailNotice && <p>{translations.newPasswordText}</p>}
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="formContainer">
          <label
            className="customField"
            htmlFor="email">
            <input
              className="inputField"
              onBlur={(e) => onLostFocus(e)}
              id="email"
              name="email"
              title="email"
              type="email"
              autoComplete="email"
              required={true}></input>
            <span className="placeholder">{translations.emailInput}</span>
          </label>
          <label
            className="customField"
            htmlFor="password">
            <input
              className="inputField"
              onBlur={(e) => onLostFocus(e)}
              id="password"
              name="password"
              title="password"
              type="password"
              autoComplete="current-password"
              required={true}></input>
            <span className="placeholder">{translations.passwordInput}</span>
          </label>
          {wrongCredentials && (
            <p className={styles.error}>{translations.loginError}</p>
          )}
          <button
            className={`${styles.submitBtn} ${"dark-green"}`}
            type="submit">
            {isLoading ? (
              <LoadingIcon title="loadIcon" />
            ) : (
              translations.loginBtn.toUpperCase()
            )}
            {}
          </button>
        </form>
      </div>
    </>
  );
}
