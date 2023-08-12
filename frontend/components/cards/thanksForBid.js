import styles from "./registerSplashScreen.module.css";
import Image from "next/image";
import languagesJson from "../../languages.json";
import { useSelector } from "react-redux";
import { useSwiper } from "swiper/react";
import "swiper/css/navigation";

export default function RegisterFirstCard(validation) {
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];
  const swiper = useSwiper();
  return (
    <div
      className={`${"component-frame"} ${styles.registerSplashScreenSpacing} ${
        styles.centerSection
      }`}>
      <div className={styles.leftCorner}></div>
      <div className={styles.headerFrame}>
        <Image
          alt="PlotEye Logo"
          src="/logo_ploteye.svg"
          width="319"
          height="118"
        />
      </div>
      <p className={styles.thanksForBidText}>{translations.thanksForBid}</p>
      <p
        className={`${styles.thanksForBidInfoFont} ${styles.thanksForBidInfo1}`}>
        {translations.inOrderToContinueWithBid}
      </p>
      <p
        className={`${styles.thanksForBidInfoFont} ${styles.thanksForBidInfo2}`}>
        {translations.yourBidIsAnonymous}
      </p>
      <p
        className={styles.continueText}
        onClick={() => swiper.slideNext()}>
        {translations.goToEmail}
      </p>
      <div className={styles.rightCorner}></div>
    </div>
  );
}
