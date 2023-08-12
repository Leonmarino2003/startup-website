import React from "react";
import { useSelector } from "react-redux";
import style from "./MyBidInfo.module.css";
import { MdOutlineHouse } from "react-icons/md";
import Image from "next/image";

function MyBidInfo() {
  const plotDetails = useSelector((state) => {
    return state.myBids.plotDetails;
  });

  return (
    <div className={style.container}>
      <div className={style.streetSection}>
        <div className={style.circleImageContainer}>
          <MdOutlineHouse className={style.houseIcon} />
        </div>
        <div>
          <h3 className={style.street}>{plotDetails.address.street}</h3>
          <p>
            {plotDetails.address.postcode} {plotDetails.address.city}
          </p>
          <p>{plotDetails.address.country}</p>
        </div>
      </div>
      <div className={style.imageSection}>
        <div className={style.squareImageContainer}>
          {/* These images are just for show, when we actually have implemented images in the app replace these 4 images below with some sort of map function
           */}
          <Image
            src="http://campus.murraystate.edu/academic/faculty/BAtieh/House2.JPG"
            alt="houseImage"
          />
        </div>
        <div className={style.squareImageContainer}>
          <Image
            src="http://campus.murraystate.edu/academic/faculty/BAtieh/House4.JPG"
            alt=""
          />
        </div>
        <div className={style.squareImageContainer}>
          <Image
            src="http://campus.murraystate.edu/academic/faculty/BAtieh/House12.jpg"
            alt=""
          />
        </div>
        <div className={style.squareImageContainer}>
          <Image
            src="https://toptenrealestatedeals.com/wp-content/uploads/2020/01/3-4-1440x960.jpg"
            alt=""
          />
        </div>
      </div>
      <div className={style.houseFacts}>
        <div className={style.fact}>
          <p>Area</p>
          {plotDetails.area !== "Unknown" ? (
            <p>
              {plotDetails.area}
              {plotDetails.areaUnits}
            </p>
          ) : (
            <p>{plotDetails.area}</p>
          )}
        </div>
        <div className={style.fact}>
          <p>Omkrets</p>
          {plotDetails.area !== "Unknown" ? (
            <p>{plotDetails.circumference}m</p>
          ) : (
            <p>{plotDetails.circumference}</p>
          )}
        </div>
        <div className={style.fact}>
          <p>Distrikt</p>
          <p>{plotDetails.district}</p>
        </div>
      </div>
      <div className={style.descriptionField}>
        <p>
          {plotDetails.description
            ? plotDetails.description
            : "Det finns ingen beskrivning ännu"}
        </p>
      </div>
    </div>
  );
}

export default MyBidInfo;
