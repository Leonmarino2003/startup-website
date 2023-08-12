import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./BidContainer.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import MyBidInfo from "./MyBidInfo";
import MyBidMessages from "./MyBidMessages";
import {
  handleShowBidContainer,
  handleShowMyBids,
} from "../../redux/slices/componentSlice";

function BidContainer() {
  const dispatch = useDispatch();
  const [toggledBtn, setToggledBtn] = useState("Info");

  function goBack() {
    dispatch(handleShowBidContainer(false));
    dispatch(handleShowMyBids(true));
  }

  return (
    <div className={style.componentFrame}>
      <section className={style.header}>
        <MdKeyboardArrowLeft
          onClick={goBack}
          className={style.icon}
        />
        <h1 className="componentHeader">
          {toggledBtn === "Info" ? "Info" : "Bud"}
        </h1>
      </section>

      {toggledBtn === "Info" ? <MyBidInfo /> : <MyBidMessages />}

      <div className={style.toggleBtns}>
        <button
          className={toggledBtn === "Info" ? `${style.toggled}` : undefined}
          onClick={() => {
            setToggledBtn("Info");
          }}>
          Info
        </button>
        <div className={style.divider}></div>
        <button
          className={toggledBtn === "Bid" ? `${style.toggled}` : undefined}
          onClick={() => {
            setToggledBtn("Bid");
          }}>
          Bud
        </button>
      </div>
    </div>
  );
}

export default BidContainer;
