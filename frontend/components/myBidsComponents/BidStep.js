import React, { useEffect, useState } from "react";
import styles from "./BidStep.module.css";

import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import languagesJson from "../../languages.json";
import Link from "next/link";

//image src = /approval_icon.svg

export default function BidStep({ status }) {
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  const [approvalIcon, setApprovalIcon] = useState({
    img1: "none",
    img2: "none",
    img3: "none",
    img4: "none",
  });
  const [backgroundColor, setBackgroundColor] = useState({
    circleBackgroundColor1: "none",
    circleBackgroundColor2: "none",
    circleBackgroundColor3: "none",
    circleBackgroundColor4: "none",
  });

  const [progressLine, setProgressLine] = useState({
    progressLine1: "0px",
    progressLine2: "0px",
    progressLine3: "0px",
  });

  const [delayCircle, setDelayCircle] = useState({
    delayCircle1: "",
    delayCircle2: "",
    delayCircle3: "",
  });

  const [animationHeight, setAnimationHeight] = useState({
    animationHeight1: "",
    animationHeight2: "",
    animationHeight3: "",
  });

  const [animationCircles, setAnimationCircles] = useState({
    animationCircles1: "",
    animationCircles2: "",
    animationCircles3: "",
    animationCircles4: "",
  });

  useEffect(() => {
    if (status == 1) {
      //Bid placed
      setAnimationCircles({
        animationCircles1: "background-color .6s",
      });
      setApprovalIcon({
        img1: "block",
      });
      setBackgroundColor({
        circleBackgroundColor1: "#4CAD61",
      });
    }

    if (status == 2) {
      setApprovalIcon({
        img1: "block",
        img2: "block",
      });
      setBackgroundColor({
        circleBackgroundColor1: "#4CAD61",
        circleBackgroundColor2: "#4CAD61",
      });
      setProgressLine({
        progressLine1: "58px",
      });
      setAnimationHeight({
        animationHeight1: "height .6s",
      });
      setDelayCircle({
        delayCircle1: ".6s",
      });
      setAnimationCircles({
        animationCircles2: "background-color .6s",
      });
    }

    if (status == 3) {
      setApprovalIcon({
        img1: "block",
        img2: "block",
        img3: "block",
      });
      setBackgroundColor({
        circleBackgroundColor1: "#4CAD61",
        circleBackgroundColor2: "#4CAD61",
        circleBackgroundColor3: "#4CAD61",
      });
      setProgressLine({
        progressLine1: "58px",
        progressLine2: "77px",
      });
      setDelayCircle({
        delayCircle2: ".6s",
      });
      setAnimationHeight({
        animationHeight2: "height .6s",
      });
      setAnimationCircles({
        animationCircles3: "background-color .6s",
      });
    }

    if (status == 4) {
      setApprovalIcon({
        img1: "block",
        img2: "block",
        img3: "block",
        img4: "block",
      });
      setBackgroundColor({
        circleBackgroundColor1: "#4CAD61",
        circleBackgroundColor2: "#4CAD61",
        circleBackgroundColor3: "#4CAD61",
        circleBackgroundColor4: "#4CAD61",
      });
      setProgressLine({
        progressLine1: "58px",
        progressLine2: "77px",
        progressLine3: "77px",
      });
      setDelayCircle({
        delayCircle3: ".6s",
      });
      setAnimationHeight({
        animationHeight3: "height .6s",
      });
      setAnimationCircles({
        animationCircles4: "background-color .6s",
      });
    }
  }, [status]);

  return (
    <div className={styles.body}>
      <div className={styles.bidProcess}>
        <div
          className={styles.circle1}
          style={{
            backgroundColor: backgroundColor.circleBackgroundColor1,
            transition: animationCircles.animationCircles1,
          }}>
          <FaCheck
            style={{
              color: "white",
              zIndex: "2",
              width: "16px",
              height: "16px",
              display: approvalIcon.img1,
            }}
          />
        </div>
        <div
          className={styles.progress1}
          style={{}}>
          <div
            className={styles.colorProgress1}
            style={{
              height: progressLine.progressLine1,

              transition: animationHeight.animationHeight1,
            }}
          />
        </div>
        <div
          className={styles.circle2}
          style={{
            backgroundColor: backgroundColor.circleBackgroundColor2,
            transitionDelay: delayCircle.delayCircle1,
            transition: animationCircles.animationCircles2,
          }}>
          <FaCheck
            style={{
              color: "white",
              zIndex: "2",
              width: "16px",
              height: "16px",
              display: approvalIcon.img1,
            }}
          />
        </div>
        <div
          className={styles.progress2}
          style={{
            backgroundColor: progressLine.progressLine2,
          }}>
          <div
            className={styles.colorProgress2}
            style={{
              height: progressLine.progressLine2,

              transition: animationHeight.animationHeight2,
            }}
          />
        </div>
        <div
          className={styles.circle3}
          style={{
            backgroundColor: backgroundColor.circleBackgroundColor3,
            transitionDelay: delayCircle.delayCircle2,
            transition: animationCircles.animationCircles3,
          }}>
          <FaCheck
            style={{
              color: "white",
              zIndex: "2",
              width: "16px",
              height: "16px",
              display: approvalIcon.img1,
            }}
          />
        </div>
        <div
          className={styles.progress3}
          style={{
            backgroundColor: progressLine.progressLine3,
          }}>
          <div
            className={styles.colorProgress3}
            style={{
              height: progressLine.progressLine3,

              transition: animationHeight.animationHeight3,
            }}
          />
        </div>
        <div
          className={styles.circle4}
          style={{
            backgroundColor: backgroundColor.circleBackgroundColor4,
            transitionDelay: delayCircle.delayCircle3,
            transition: animationCircles.animationCircles4,
          }}>
          <FaCheck
            style={{
              color: "white",
              zIndex: "2",
              width: "16px",
              height: "16px",
              display: approvalIcon.img1,
            }}
          />
        </div>
      </div>
      <div className={styles.bidDesc}>
        <Link href="">
          <div>
          {translations.bidProgressBidPlaced}
          <p>
            {translations.bidProgressBidPlacedDesc1}
            <br />
            {translations.bidProgressBidPlacedDesc2}
          </p>
          </div>
        </Link>
        <Link href="">
          <div>
          {translations.bidProgressBidSent}
          <p>
            {translations.bidProgressBidSentDesc1}
            <br />
            {translations.bidProgressBidSentDesc2}
          </p>
          </div>
        </Link>
        <Link href="">
          <div>
          {translations.bidProgressBidRecieved}
          <p>
            {translations.bidProgressBidRecievedDesc1}
            <br />
            {translations.bidProgressBidRecievedDesc2}
          </p>
          </div>
        </Link>
        <Link href="">{translations.bidProgressDecision}</Link>
      </div>
    </div>
  );
}
