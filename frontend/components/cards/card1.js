import styles from "../SplashScreen.module.css";
import React from "react";
import Image from "next/image";

export default function FirstCard() {
  return (
    <>
      <div className={styles.splashWrapper}>
        <div className={styles.centerSection}>
          <h1 className={styles.h1}>Welcome to</h1>
          <Image
            alt="logo"
            src="/logo_ploteye.svg"
            width="400"
            height="200"
            objectFit="fit"
            quality={100}
            priority={true}
          />
          <p className={styles.welcomeText}>
            Ploteye is a web app that will make real estate transactions easier
            and more accessible.{" "}
          </p>
        </div>
      </div>
    </>
  );
}
