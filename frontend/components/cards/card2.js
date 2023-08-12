import styles from "../SplashScreen.module.css";
import React from "react";
import Image from "next/image";
import { HandleClick } from "../SplashScreen.js";

export default function SecondCard() {
  return (
    <>
      <div className={styles.splashWrapper}>
        <div className={styles.centerSection}>
          <Image
            alt="logo"
            src="/logo_ploteye.svg"
            width="300"
            height="300"
            objectFit="fit"
            quality={100}
            priority={true}
          />
          <div>
            <Image
              alt="map"
              src="/map-intro.svg"
              width="250"
              height="250"
              objectFit="contain"
              quality={100}
              priority={true}
            />
          </div>
          <p style={{ fontSize: 20, fontWeight: 600 }}>
            Found a plot you like?
          </p>
          <p
            style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 400 }}>
            Easily place a bid by tapping it and enter your offer.
          </p>
        </div>
      </div>
    </>
  );
}
