import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Settings.module.css";
import { setIsLoggedIn } from "../../redux/slices/loginSlice";
import {
  handleShowAccountSettings,
  handleShowSettings,
  handleShowPaymentAndPoints,
  hideAll,
  handleDisplayLanguage,
  handleShowAbout,
  handleShowChangeCurrency,
  handleShowHelpAndSupportPage,
  handleShowProfilePage,
  handleShowLogInForm,
  handleShowMyBids,
  handleShowOverlay,
  handleShowNotificationSettings,
  handleShowEmailSignup,
  handleShowAdminInterface,
} from "../../redux/slices/componentSlice";

import { CgProfile } from "react-icons/cg";
import languagesJson from "../../languages.json";
import { changeLanguage} from "../../redux/slices/userSlice";

//import react icons
import { BiExit, BiLock } from "react-icons/bi";

import {
  RiContactsLine,
  RiTranslate2,
} from "react-icons/ri";

import {GrCurrency } from "react-icons/gr";
import { getAccountData } from "../../utilities/utils";
import Link from "next/link";
import Image from "next/image";

function Settings() {
  const dispatch = useDispatch();
  // const [profileImage, setProfileImage] = useState(null);
  // const profileImageToDisplay = useSelector((state) => state.user.profileImage);
  // const [languages, setLanguages] = useState([]);
  // const [isActive, setIsActive] = useState(false);
  // const [isActive2, setIsActive2] = useState(false);
  const isLoggedIn = useSelector((state) => {
    return state.login.isLoggedIn;
  });

  const userRole = useSelector((state) => state.user.role);
  const profileImageToDisplay = useSelector((state) => state.user.profileImage);

  function hideSettings() {
    dispatch(handleShowSettings(false));
  }

  function toMyBids() {
    // dispatch(hideAll());
    // dispatch(handleShowOverlay(true));
    dispatch(handleShowMyBids(true));
    hideSettings();
  }

  function toAccount() {
    dispatch(handleShowAccountSettings(true));
    hideSettings();
  }

  function toProfilePage() {
    dispatch(handleShowProfilePage(true));
    hideSettings();
  }

  function toDisplayLanguage() {
    dispatch(handleDisplayLanguage(true));
    hideSettings();
  }

  function toPaymentAndPoints() {
    dispatch(handleShowPaymentAndPoints(true));
    hideSettings();
  }

  function toAbout() {
    dispatch(handleShowAbout(true));
    hideSettings();
  }

  function toCurrency() {
    dispatch(handleShowChangeCurrency(true));
    hideSettings();
  }

  function toHelp() {
    dispatch(handleShowHelpAndSupportPage(true));
    hideSettings();
  }

  function toNotification() {
    dispatch(handleShowNotificationSettings(true));
    hideSettings();
  }

  function logout() {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(setIsLoggedIn(false));
    dispatch(hideAll());
  }

  function showLogin() {
    dispatch(hideAll());
    dispatch(handleShowOverlay(true));
    dispatch(handleShowLogInForm(true));
  }

  function handleClosing() {
    dispatch(hideAll());
  }

  const toRegistration = () => {
    if (!isLoggedIn) {
      dispatch(hideAll());
      dispatch(handleShowOverlay(true));
      dispatch(handleShowEmailSignup(true));
    }
  };

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];
  const language = languagesJson[languageToUse].language;

  // Change currency support
  let currencyToUse = useSelector((state) => {
    return state.user.currency;
  });

  function handleChangeLanguage(ISO) {
    dispatch(changeLanguage(ISO));
    localStorage.setItem("language", ISO);
    dispatch(hideAll());
  }

  const showAdminInterface = () => {
    dispatch(hideAll());
    dispatch(handleShowAdminInterface(true));
  };

  async function checkIfLoggedIn() {
    getAccountData();
  }

  function openTerms() {
    window.open("https://www.ploteye.com/terms-of-service");
  }

  function openPolicy() {
    window.open("https://www.ploteye.com/privacy-policy");
  }

  function openFaq() {
    window.location.href = "/Faq";
  }

  checkIfLoggedIn();

  return (
    <div className={styles.container}>
      <div>
        <button
          className={styles.item}
          onClick={toDisplayLanguage}>
          <RiTranslate2 className={styles.icons} />
          {translations.languages}
          <p>{language}</p>
        </button>
      </div>
      <div>
        <button
          className={styles.item}
          onClick={toCurrency}>
          <GrCurrency className={styles.icons} />
          {translations.currency}
          <p>{currencyToUse}</p>
          {}
        </button>
      </div>

      <div>
        <Link href="/Faq">
          <button
            className={styles.item}
            onClick={handleClosing}>
            <RiContactsLine className={styles.icons} />
            {translations.helpAndSupport}
          </button>
        </Link>
      </div>

      <div>
        {isLoggedIn ? (
          <button
            className={`${styles.item} ${styles.noBorder}`}
            onClick={() => logout()}>
            <BiExit className={`${styles.icons} ${styles.rotate180}`} />
            {translations.logOut}
          </button>
        ) : (
          <button
            className={`${styles.item} ${styles.noBorder}`}
            onClick={() => showLogin()}>
            <BiExit className={styles.icons} />
            {translations.loginBtn}
          </button>
        )}
      </div>

      {/* Humburgare Menu Content */}
      <div className={styles.hamMenuContainer}>
        {/* Create Account & My Profile Button */}
        <div>
          {isLoggedIn ? (
            <button
              className={styles.hamItem}
              onClick={() => toProfilePage()}>
              <CgProfile
                className={styles.hamIcon}
                size={39}
              />
              {translations.myProfileBtn}
            </button>
          ) : (
            <button
              className={styles.hamItem}
              onClick={() => toRegistration()}>
              <CgProfile size={39} />
              <p>{translations.CreateAccount}</p>
            </button>
          )}
        </div>
        {/* My Bids Button */}
        <div>
          <button
            className={styles.hamItem}
            onClick={() => toMyBids()}>
            <Image
              alt=""
              src="/Mybids-icon.png"
              intrinsic
              width="38"
              height="38"></Image>
            <p>{translations.myBids}</p>
          </button>
        </div>
        <div>
          <Link href="/about">
            <button
              className={styles.hamItem}
              onClick={handleClosing}>
              <BiLock
                className={styles.hamIcon}
                size={39}
              />
              <p>{translations.about}</p>
            </button>
          </Link>
        </div>
        <div>
          <button
            className={styles.hamItem}
            onClick={toDisplayLanguage}>
            <RiTranslate2 size={39} />
            <p>{translations.languages}</p>
          </button>
        </div>
        <div>
          <button
            className={styles.hamItem}
            onClick={toCurrency}>
            <GrCurrency size={39} />
            <p>{translations.currency}</p>
          </button>
        </div>
        <div>
          <Link href="/Faq">
            <button
              className={styles.hamItem}
              onClick={handleClosing}>
              <RiContactsLine size={39} />
              <p>{translations.helpAndSupport}</p>
            </button>
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              className={`${styles.hamiItem} ${styles.noBorder}`}
              onClick={() => logout()}>
              <BiExit
                size={39}
                className={`${styles.rotate180}`}
              />
              <p>{translations.logOut}</p>
            </button>
          ) : (
            <button
              className={`${styles.hamItem} ${styles.noBorder}`}
              onClick={() => showLogin()}>
              <BiExit size={39} />
              <p>{translations.loginBtn}</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
