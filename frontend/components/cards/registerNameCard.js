import Image from "next/image";
import { useState } from "react";
import styles from "./registerSplashScreen.module.css";
import { useSelector } from "react-redux";
import { onLostFocus } from "../../services/inputService";
import languagesJson from "../../languages.json";
import { useSwiper } from "swiper/react";
import { SwiperButtonNext } from "./registerNextSlideBtn";
import Link from "next/link";

export default function RegisterNameCard(userDataName) {
  const swiper = useSwiper();
  const [userName, setUserName] = useState("");
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailNotice = useSelector((state) => {
    return state.placeBid.displayEmailNotice;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];
  translations.emailForUser = userName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add user to db
    const userObj = {
      name: userName,
    };
    userDataName.onSubmit({ ...userDataName.userData, ...userObj });
    swiper.slideNext();
  };

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  return (
    <div className={`${"component-frame"} ${styles.componentFrame}`}>
      <div className={styles.leftCorner}></div>
      <div className={styles.headerFrame}>
        <Image
          alt="PlotEye Logo"
          src="/logo_ploteye.svg"
          intrinsic
          width="319"
          height="118"></Image>
        {emailNotice && <p>{translations.newPasswordText}</p>}
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.formContainer}>
        <div className={styles.formInput}>
          <label
            className={`${"customField"} ${styles.loginForm}`}
            htmlFor="name">
            {translations.name}
          </label>
          <input
            className="inputField"
            onChange={handleNameChange}
            onBlur={(e) => onLostFocus(e)}
            type="name"
            placeholder="Anna Andersson..."
            autoComplete="name"
            title="name"
            maxLength={254}
            required={true}></input>

          <div className={styles.formContainer}>
            <div className={styles.TOS}>
              <label>{translations.iAgree}</label>
              <Link href="https://coconut-octahedron-jt6r.squarespace.com/terms-of-service">
                <div>
                {" "}
                {translations.terms}
                </div>
              </Link>{" "}
              <label>{translations.and}</label>
              <Link href="https://coconut-octahedron-jt6r.squarespace.com/privacy-policy">
                <div>
                {" "}
                {translations.policy}.
                </div>
              </Link>
            </div>
          </div>
        </div>
        {emailAlreadyExists && <p>{translations.emailExistAlready}</p>}
        <SwiperButtonNext />
      </form>
      <div className={styles.rightCorner}></div>
    </div>
  );
}
