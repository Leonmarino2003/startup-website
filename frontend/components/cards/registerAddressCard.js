import { useState } from "react";
import styles from "./registerSplashScreen.module.css";
import { useSelector } from "react-redux";
import { onLostFocus } from "../../services/inputService";
import languagesJson from "../../languages.json";
import Image from "next/image";
import { useSwiper } from "swiper/react";
import { SwiperButtonNext } from "./registerNextSlideBtn";
import Link from "next/link";

export default function RegisterAddressCard(userDataAddress) {
  const swiper = useSwiper();
  const [userAddress, setUserAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];
  translations.addressForUser = userAddress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userObj = {
      address: userAddress,
    };
    userDataAddress.onSubmit({ ...userDataAddress.userData, ...userObj });
    swiper.slideNext();
  };

  function handleAddressChange(e) {
    setUserAddress(e.target.value);
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
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.formContainer}>
        <div className={styles.formInput}>
          <label
            className={`${"customField"} ${styles.loginForm}`}
            htmlFor="address">
            {translations.addressHeader}
          </label>
          <input
            className="inputField"
            onChange={handleAddressChange}
            onBlur={(e) => onLostFocus(e)}
            type="address"
            placeholder="Exempelvägen 12, 34 567 Malmö"
            autoComplete="address"
            title="address"
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
  );
}
