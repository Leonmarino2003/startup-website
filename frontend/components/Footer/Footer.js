import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CiMail, CiTwitter } from "react-icons/ci";
import { AiFillLinkedin } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";
import languagesJson from "../../languages.json";
import { useSelector } from "react-redux";

const Footer = ({ displays = true }) => {
  if (displays) {
    // Change language support
    let languageToUse = useSelector((state) => {
      return state.user.language;
    });
    const translations = languagesJson[languageToUse];

    return (
      <>
        <footer>
          <div className={styles.footer}>
            <div className={styles.footer__section}>
              <h3 className={styles.footer__title}>
                {translations.FooterLearnMore}
              </h3>
              <Link
                href="https://www.ploteye.com/about-us"
                className={styles.footer__link}>
                {translations.FooterAbout}
              </Link>
              <Link
                href="https://www.ploteye.com/terms-of-service"
                className={styles.footer__link}>
                {translations.FooterTermsOfUse}
              </Link>
              <Link
                href="https://www.ploteye.com/privacy-policy"
                className={styles.footer__link}>
                {translations.FooterPolicy}
              </Link>
            </div>
            <div className={styles.footer__section}>
              <h3 className={styles.footer__title}>
                {translations.FooterPlotsHouses}
              </h3>
              <Link
                href="https://app.ploteye.com/"
                className={styles.footer__link}>
                {translations.FooterPlots}
              </Link>
              <Link
                href="https://app.ploteye.com/"
                className={styles.footer__link}>
                {translations.FooterHouses}
              </Link>
              <Link
                href="https://app.ploteye.com/"
                className={styles.footer__link}>
                {translations.FooterLookAround}
              </Link>
            </div>
            <div className={styles.footer__section}>
              <h3 className={styles.footer__title}>
                {translations.FooterContact}
              </h3>
              <Link
                href="mailto:Ploteyeglobal@gmail.com"
                className={styles.footer__link}>
                Ploteyeglobal@gmail.com
              </Link>
              <Link
                href="https://www.ploteye.com/contact"
                className={styles.footer__link}>
                {translations.FooterContact}
              </Link>
            </div>
            <div className={styles.footer__section}>
              <div className={styles.footer__section}>
                <h3>{translations.FooterSocials}</h3>
                <div className={styles.footer__social}>
                  <a href="#">
                    <FaInstagram className={styles.footer__socialIcon} />
                  </a>
                  <a href="#">
                    <CiTwitter className={styles.footer__socialIcon} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/ploteye/"
                    target="_blank">
                    <AiFillLinkedin className={styles.footer__socialIcon} />
                  </a>
                  <a
                    href="mailto:Ploteyeglobal@gmail.com"
                    target="_blank">
                    <CiMail className={styles.footer__socialIcon} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer__copy}>
            <Link href="/">
              <Image
                alt="PlotEye Logo"
                className={styles.logo}
                src="/logo_ploteye.svg"
                intrinsic
                width="250"
                height="125"></Image>
            </Link>
            <p className={styles.footer__copy_text}>
              © {new Date().getFullYear()} Ploteye |{" "}
              {translations.AllRightsReserved}
            </p>
          </div>
        </footer>
      </>
    );
  }
};

export default Footer;
