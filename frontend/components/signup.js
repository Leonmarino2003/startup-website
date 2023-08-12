import styles from "./signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { shouldDisplayEmailNotice } from "../redux/slices/bidSlice.js";
import {
  handleShowEmailSignup,
  handleShowLogIn,
  handleShowSignup,
} from "../redux/slices/componentSlice.js";
import languagesJson from "../languages.json";

export default function SignUp() {
  const dispatch = useDispatch();

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  function facebookSignup() {
    // Connect this to or replace it with Facebook oauth
  }

  function googleSignup() {
    // Connect this to or replace it with Google oauth
  }

  function bankIDLogin() {
    // Connect this to or replace it with Bank ID oauth
  }

  function emailSignup() {
    dispatch(handleShowEmailSignup(true));
    dispatch(handleShowSignup(false));
  }

  function emailLogin() {
    dispatch(handleShowLogIn(true));
    dispatch(shouldDisplayEmailNotice(false));
    dispatch(handleShowSignup(false));
  }

  return (
    <div
      style={{ textAlign: "center" }}
      className="component-frame">
      <div className={styles.headerFrame}>
        <h1 className={styles.signupHeader}> {translations.registerHeader}</h1>
        <p className={styles.headerExtra}>{translations.registerInfoText}</p>
      </div>
      {}
      <div className={styles.alternativesFrame}>
        <button
          className={`${styles.signupBtn} ${"dark-green"}`}
          onClick={() => emailSignup()}>
          {translations.registerWithEmailBtn}
        </button>
        <button
          className={`${styles.signupBtn}`}
          onClick={() => emailLogin()}>
          {translations.loginWithEmailBtn}
        </button>
      </div>
    </div>
  );
}
