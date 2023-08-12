import styles from "./registerSplashScreen.module.css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CloseButton from "./CloseButton";
import RegisterEmailCard from "./registerEmailCard";
import RegisterNameCard from "./registerNameCard";
import RegisterAddressCard from "./registerAddressCard";
import RegisterPhoneNumberCard from "./registerPhoneNumberCard";
import RegisterEnterPasswordCard from "./registerEnterPasswordCard";
import RegisterEmailVerification from "./registerEmailVerification";
import Image from "next/image";
import RegisterPasswordCard from "./registerPasswordCard";

export default function RegisterCardSwiper() {
  const [userData, setUserData] = useState();
  const [isUserCreatedPass, setIsUserCreatedPass] = useState(false);
  function handlePasswordCreator(){
    setIsUserCreatedPass(!isUserCreatedPass)
  }
  console.log(userData)
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
          <CloseButton componentToClose="RegisterSwiper" />
          <SwiperSlide>
            <RegisterEmailCard
              onSubmit={(userDataEmail) =>
                setUserData({ ...userData, ...userDataEmail })
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <RegisterNameCard
              onSubmit={(userDataName) =>
                setUserData({ ...userData, ...userDataName })
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <RegisterAddressCard
              onSubmit={(userDataAddress) =>
                setUserData({ ...userData, ...userDataAddress })
              }
            />
          </SwiperSlide>
          {isUserCreatedPass ? (
            <>
          <SwiperSlide>
            <RegisterPhoneNumberCard 
              onSubmit={(userDataPhone) =>
                setUserData({ ...userData, ...userDataPhone})}
            isUserCreatedPass={isUserCreatedPass} handleChange={handlePasswordCreator} />
          </SwiperSlide>
          <SwiperSlide>
              <RegisterPasswordCard userData={userData} isUserCreatedPass={isUserCreatedPass}/>
          </SwiperSlide>
              </>
          ): 
          <SwiperSlide>
          <RegisterPhoneNumberCard userData={...userData} isUserCreatedPass={isUserCreatedPass}
            handleChange={handlePasswordCreator} 
          />
          </SwiperSlide>}

          <SwiperSlide>
            <RegisterEmailVerification userData={userData} />
          </SwiperSlide>
          <SwiperSlide>
            <RegisterEnterPasswordCard userData={userData} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
