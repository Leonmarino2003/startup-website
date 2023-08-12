import styles from "./SplashScreen.module.css";

import React from "react";
import { setDisplaySplashScreen } from "../redux/slices/splashSlice";
import { useDispatch } from "react-redux";

import CardsSwiper from "./cards/CardsSwiper";


export default function SplashScreen() {
  const dispatch = useDispatch();

  const HandleClick = (e) => {
    e.preventDefault();

    localStorage.setItem("SplashScreen", "disabled");
    dispatch(setDisplaySplashScreen(false));
  };

  return (
    <div
      className={styles.componentContainer}>
      <div className={styles.splashWrapper}>
        <CardsSwiper />
      </div>
      <div className={styles.background}></div>
    </div>
  );
}
