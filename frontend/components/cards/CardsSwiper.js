import React from "react";
import CloseButton from "./CloseButton";
import Checkbox from "./Checkbox";

import styles from "../SplashScreen.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import FirstCard from "./card1";
import SecondCard from "./card2";
import ThirdCard from "./card3";
import FourthCard from "./card4";
import FifthCard from "./card5";
import Login from "../login";

export default function CardsSwiper() {
  const shouldShow = !localStorage.getItem("hideMyComponent");
  return (
    <>
      <div className={styles.splashWrapper}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#4CAD61",
            "--swiper-pagination-color": "#4CAD61",
          }}
          className={styles.mySwiper}
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}>
          <div className={styles.leftCorner}></div>
          <div className={styles.rightCorner}></div>
          <CloseButton componentToClose="CardsSwiper" />
          <Checkbox
            label="Don't show this again"
            storageKey="hideMyComponent"
          />
          <SwiperSlide>
            <FirstCard />
          </SwiperSlide>
          <SwiperSlide>
            <SecondCard />
          </SwiperSlide>
          <SwiperSlide>
            <ThirdCard />
          </SwiperSlide>
          <SwiperSlide>
            <FourthCard />
          </SwiperSlide>
          <SwiperSlide>
            <FifthCard />
          </SwiperSlide>
          ...
        </Swiper>
      </div>

      <div className={styles.background}></div>
    </>
  );
}
