import Image from "next/image";
import { useState } from "react";
import styles from "./registerSplashScreen.module.css";
import { useSelector } from "react-redux";
import languagesJson from "../../languages.json";
import { createAccount } from "../../services/backendService";
import "react-phone-number-input/style.css";
import se from "react-phone-number-input/locale/sv.json";
import en from "react-phone-number-input/locale/en.json";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import { useSwiper } from "swiper/react";
import Link from "next/link";
import { SwiperButtonNext } from "./registerNextSlideBtn";

export default function RegisterPhoneNumberCard({isUserCreatedPass, handleChange, userData, ...userDataNumber}) {
  const swiper = useSwiper();
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [badPhoneNumber, setBadPhoneNumber] = useState(false);
  console.log(isUserCreatedPass)
  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];
  translations.phonenumberForUser = userPhoneNumber;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(isUserCreatedPass){
      const userObj = {
        phoneNumber: userPhoneNumber
      }
      userDataNumber.onSubmit({ ...userDataNumber.userData, ...userObj });
      swiper.slideNext();
  
  } else {
    const userObj = {
      email: userData.email,
      name: userData.name,
      address: userData.address,
      phoneNumber: userPhoneNumber,
    };
    if (
      isValidPhoneNumber(userPhoneNumber) &&
      isPossiblePhoneNumber(userPhoneNumber)
    ) {
      try {
        await createAccount(userObj, isUserCreatedPass);
        swiper.slideNext();
      } catch (error) {
        console.error(error);
      }
    } else {
      setBadPhoneNumber(true);
    }
  }
  };

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
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.formContainer}>
        <div className={styles.formInput}>
          <label
            className={`${"customField"} ${styles.loginForm} ${
              styles.lablePadding
            }`}
            htmlFor="phoneNumber">
            {translations.phoneNumber}
          </label>
          <PhoneInput
            className={styles.inputField}
            defaultCountry="SE"
            placeholder="070 - XXX XX XX"
            value={userPhoneNumber}
            labels={languageToUse === "en-GB" ? en : se}
            onChange={(userPhoneNumber) => setUserPhoneNumber(userPhoneNumber)}
          />
          {badPhoneNumber ? (
            <p className={styles.badPhoneNumber}>
              Invalid phone number, please enter a valid phone number to
              continue
            </p>
          ) : null}
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
      <div style={{display:"flex", justifyContent: "center", paddingleft: "20"}}>
      <input name="checked" type="checkbox" checked={isUserCreatedPass} onChange={() => handleChange()}/><p>
      Register with own Password</p></div>
      <div className={styles.rightCorner}></div>
    </div>
  );
}
