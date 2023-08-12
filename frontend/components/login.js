import styles from "./login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setDisplaySplashScreen } from "../redux/slices/splashSlice";
import { useState } from "react";

import {
  handleShowLogIn,
  handleShowLogInForm,
  handleShowWhyLogInBox,
  handleShowLoginSwiper,
  handleShowRegisterCardSwiper,
} from "../redux/slices/componentSlice";
import { CgClose, setEmail } from "react-icons/cg";
import Image from "next/image";
import languagesJson from "../languages.json";
import LoadingIcon from "./loadingIcons/LoadingIcon";
import CloseButton from "./cards/CloseButton";

export default function LogIn() {
  const dispatch = useDispatch();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });
  const emailNotice = useSelector((state) => {
    return state.placeBid.displayEmailNotice;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const goToRegistration = () => {
    if (!isLoggedIn) {
      dispatch(handleShowRegisterCardSwiper(true));
      dispatch(handleShowLoginSwiper(false));
      //console.log("go to register");
    }
  };

  const goToLogin = () => {
    if (!isLoggedIn) {
      dispatch(handleShowLogIn(false));
      dispatch(handleShowLogInForm(true));
      //console.log("go to login");
      localStorage.setItem("SplashScreen", "disabled");
      dispatch(setDisplaySplashScreen(false));
    }
  };

  const goAsGuest = () => {
    dispatch(handleShowLoginSwiper(false));
  };

  const whyLoginBox = () => {
    dispatch(handleShowWhyLogInBox(true));
  };

  return (
    <div className={`${"component-frame"} ${styles.componentFrame}`}>
      <CloseButton componentToClose="LogIn" />
      <div className={styles.headerFrame}>
        <Image
          alt="logo"
          src="/logo_ploteye.svg"
          intrinsic
          width="200"
          height="150"></Image>
        {emailNotice && <p>{translations.newPasswordText}</p>}
      </div>
      <div className={styles.formContainer}>
        {wrongCredentials && (
          <p className={styles.error}>{translations.loginError}</p>
        )}
        {isBanned && <p className={styles.error}>{translations.isBanned}</p>}
        <button
          onClick={() => goToLogin()}
          className={`${styles.submitBtn} ${"dark-green"}`}>
          {isLoading ? <LoadingIcon title="loadIcon" /> : translations.loginBtn}
        </button>
        <button
          className={`${styles.guestBtn} ${"clear-color"}`}
          onClick={() => goToRegistration()}>
          Sign up here
        </button>
        <div className={styles.formContainer}>
          {}
          <div className={styles.readMoreBox}>
            <p>
              In order to place a bid you need to be logged in,
              <b onClick={() => whyLoginBox()}> Read more about why</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
