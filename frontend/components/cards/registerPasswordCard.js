import Image from "next/image";
import { useState } from "react";
import styles from "./registerSplashScreen.module.css";
import { useSelector } from "react-redux";
import { onLostFocus } from "../../services/inputService";
import languagesJson from "../../languages.json";
import { useSwiper } from "swiper/react";
import { SwiperButtonNext } from "./registerNextSlideBtn";
import Link from "next/link";
import { createAccount } from "../../services/backendService";

export default function RegisterPasswordCard({isUserCreatedPass, ...userData }) {
    const swiper = useSwiper();
    const [userPassword, setUserPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Add user to db
        const userObj = {
            email: userData.userData.email,
            name: userData.userData.name,
            address: userData.userData.address,
            phoneNumber: userData.userData.phoneNumber,
            password: userPassword
        };
        try {
            await createAccount(userObj, isUserCreatedPass);
            swiper.slideNext();
          } catch (error) {
            console.error(error);
          }
      }

      let languageToUse = useSelector((state) => {
        return state.user.language;
      });
      const translations = languagesJson[languageToUse];

      function handlePasswordChange(e) {
        setUserPassword(e.target.value);
      }
    return (<div className={`${"component-frame"} ${styles.componentFrame}`}>
    <div className={styles.leftCorner}></div>
    <div className={styles.headerFrame}>
      <Image
        alt="PlotEye Logo"
        src="/logo_ploteye.svg"
        intrinsic
        width="200"
        height="150"></Image>
    </div>
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.formContainer}>
      <div className={styles.formInput}>
        <label
          className={`${"customField"} ${styles.loginForm}`}
          htmlFor="email">
          {`password...`}
        </label>
        <input
          className="inputField"
          value={userPassword}
          onBlur={(e) => onLostFocus(e)}
          onChange={(e) => handlePasswordChange(e)}
          type="password"
          placeholder="*********"
          autoComplete="password"
          title="password"
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
      <SwiperButtonNext />
    </form>
    <div className={styles.rightCorner}></div>
  </div>
  )
}