import styles from "../SplashScreen.module.css";
import React from "react";
import Image from "next/image";
import { HandleClick } from "../SplashScreen.js";

export default function FifthCard() {
  return (
    <>
      <div className={styles.splashWrapper}>
        <div className={styles.fifthCardPhoto}>
          <Image
            alt="place bid"
            src="/place-bid.svg"
            width="400"
            height="500"
            objectFit="contain"
            quality={100}
            priority={true}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <p
            style={{
              color: "#4CAD61",
              fontSize: 40,
              fontWeight: 600,
              marginBottom: 0,
            }}>
            Place a bid
          </p>
          <p
            style={{
              color: "#ccc",
              fontSize: 20,
              fontWeight: 500,
              marginTop: 0,
            }}>
            After choosing a plot
          </p>
          <p style={{ color: "#000", fontSize: 20, fontWeight: 600 }}>
            1. Type in amount
          </p>
          <p style={{ color: "#000", fontSize: 20, fontWeight: 600 }}>
            2. Place bid
          </p>
        </div>
      </div>
    </>
  );
}
