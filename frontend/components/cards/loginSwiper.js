import styles from "./registerSplashScreen.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CloseButton from "./CloseButton";
import Login from "../login.js";
import ThanksForBid from "./thanksForBid.js";

export default function LoginSwiper() {
  return (
    <div className={styles.overlay}>
      <div
        className={`${"component-frame"} ${styles.centerSection} ${
          styles.transform
        }`}>
        <Swiper
          className={styles.mySwiper}
          slidesPerView={1}
          allowSlidePrev={false}
          allowTouchMove={false}>
          <CloseButton componentToClose="LoginSwiper" />
          <SwiperSlide>
            <ThanksForBid />
          </SwiperSlide>
          <SwiperSlide>
            <Login />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
