import styles from "../SplashScreen.module.css";
import React from "react";
import Image from "next/image";
import { HandleClick } from "../SplashScreen.js";

export default function FourthCard() {
  return (
    <>
      <div className={styles.splashWrapper}>
        <div className={styles.centerSection}>
          <p style={{ color: "#4CAD61", fontSize: 40, fontWeight: 500 }}>
            Pick a plot
          </p>
          <div>
            <Image
              alt="pickPlot intro"
              style={{ marginBottom: 40 }}
              src="/pickPlot-intro.svg"
              width="300"
              height="300"
              objectFit="contain"
              quality={100}
              priority={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
