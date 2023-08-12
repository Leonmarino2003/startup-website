import { useState } from "react";
import styles from "./registerSplashScreen.module.css";
import { useSelector } from "react-redux";
import { onLostFocus } from "../../services/inputService";
import languagesJson from "../../languages.json";
import Image from "next/image";
import { SwiperButtonNext } from "./registerNextSlideBtn";
import { useSwiper } from "swiper/react";
import Link from "next/link";

export default function RegisterEmailCard(userDataEmail) {
  const swiper = useSwiper();
  const [userEmail, setUserEmail] = useState("");
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
  translations.emailForUser = userEmail;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add user to db
    const userObj = {
      email: userEmail,
    };
    userDataEmail.onSubmit({ ...userDataEmail.userData, ...userObj });
    swiper.slideNext();
  };

  function handleEmailChange(e) {
    setUserEmail(e.target.value);
  }

  return (
    <div className={`${"component-frame"} ${styles.componentFrame}`}>
      <div className={styles.leftCorner}></div>
      <div className={styles.headerFrame}>
        <Image
          alt="PlotEye Logo"
          src="/logo_ploteye.svg"
          intrinsic
          width="200"
          height="150"></Image>
        {emailNotice && <p>{translations.newPasswordText}</p>}
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.formContainer}>
        <div className={styles.formInput}>
          <label
            className={`${"customField"} ${styles.loginForm}`}
            htmlFor="email">
            {translations.emailInput}
          </label>
          <input
            className="inputField"
            onChange={handleEmailChange}
            onBlur={(e) => onLostFocus(e)}
            type="email"
            placeholder="anna.andersson@email.com"
            autoComplete="email"
            title="email"
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
