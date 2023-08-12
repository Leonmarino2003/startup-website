import React, { useEffect, useState } from "react";
import style from "./MessageComponent.module.css";
import { BsPerson, BsPlus } from "react-icons/bs";
import Image from "next/image";

function MessageComponent({
  bidAmount,
  currency,
  messageContent,
  name,
  profileImage,
  sender,
  status = "Bid",
  index,
  allBids,
}) {
  const messageType = status;
  const [bgColor, setBgColor] = useState(null);
  const [isLastMessage, setIsLastMessage] = useState(true);


  function setMessageBackgroundColor() {
    if (messageType === "Accepted") {
      setBgColor("#CCE8D0");
    }
    if (messageType === "Declined") {
      setBgColor("#E8CCCC");
    }
    if (messageType === "Bid") {
      setBgColor("#f2f2f2");
    }
  }

  // We wanna check if this is the last message or not, if it is we wanna show the new bid button if its not we don't wanna show it. Otherwise it would be annoying with a lot of newBid button after every declined message
  function checkIfLastMessage() {
    if (allBids.length - 1 > index) {
      setIsLastMessage(false);
    }
  }

  useEffect(() => {
    setMessageBackgroundColor();
    if (messageType === "Declined") {
      checkIfLastMessage();
    }
    return;
  });

  function sendNewBid() {
    console.log("newbid");
    // here will the logic for sending a new bid be
  }

  return (
    <div
      className={style.messageBox}
      style={{ backgroundColor: bgColor }}>
      <div className={style.message}>
        <div className={style.imageContainer}>
          {messageType === "Bid" ? (
            <>
              <Image
                src={profileImage}
                alt="profileImage"
              />
            </>
          ) : (
            <BsPerson className={style.unknownIcon} />
          )}
        </div>
        <div className={style.messageContent}>
          <div className={style.messageHeading}>
            {messageType === "Bid" ? (
              <p>
                {name.firstName} {name.lastName}
              </p>
            ) : (
              <p>{sender}</p>
            )}
            {}
            <></>
          </div>
          <p className={style.messageText}>{messageContent}</p>
        </div>
      </div>
      <div className={style.bidContainer}>
        {messageType === "Bid" ? (
          <>
            <p>Bud:</p>
            <p>
              {bidAmount} {currency}
            </p>
          </>
        ) : (
          <p>{messageType}</p>
        )}
      </div>
      {messageType === "Declined" && isLastMessage && (
        <button
          className={style.newBid}
          onClick={sendNewBid}>
          New Bid <BsPlus className={style.plusIcon} />
        </button>
      )}
    </div>
  );
}

export default MessageComponent;
