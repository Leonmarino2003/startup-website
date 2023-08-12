import styles from "../SplashScreen.module.css";
import React from "react";
import Image from "next/image";
import { HandleClick } from "../SplashScreen.js";

export default function ThirdCard() {
  return (
    <>
      <div className={styles.splashWrapper}>
        <div className={styles.centerSection}>
          <Image
            alt="logo"
            src="/logo_ploteye.svg"
            width="300"
            height="200"
            objectFit="contain"
            quality={100}
            priority={true}
          />
          <Image
            alt="Girl holding sign"
            src="/Girl_holding_sign.svg"
            width="300"
            height="300"
            objectFit="contain"
            quality={100}
            priority={true}
          />

          <p style={{ fontSize: 20, fontWeight: 600 }}>No worries!</p>
          <p
            style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 400 }}>
            {" "}
            You’re always free to change your mind about placing a bid.
          </p>
        </div>
      </div>
    </>
  );
}
