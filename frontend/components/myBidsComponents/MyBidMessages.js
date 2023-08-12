import React from "react";
import { useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";
import style from "./MyBidMessages.module.css";

function MyBidMessages() {
  const profileImageToDisplay = useSelector((state) => state.user.profileImage);
  const nameOfUser = useSelector((state) => state.user.name);
  const bidDetails = useSelector((state) => {
    return state.myBids.bidDetails;
  });
  return (
    <div className={style.container}>
      {bidDetails.bids.map((bid, i) => {
        const bidMessage = bid.messages[0];
        const responseMessage = bid.messages[1] || null;
        return (
          <div key={"message-" + i}>
            <MessageComponent
              key={bidMessage.time}
              name={nameOfUser}
              profileImage={profileImageToDisplay}
              bidAmount={bid.amount}
              sender={bidMessage.from || "Unknown"}
              messageContent={bidMessage.message}
              time={bidMessage.time}
              currency={bidDetails.bidCurrency}
            />
            {responseMessage && (
              <MessageComponent
                key={responseMessage.time}
                index={i}
                allBids={bidDetails.bids}
                sender={responseMessage.from || "Unknown"}
                messageContent={responseMessage.message}
                time={responseMessage.time}
                status={responseMessage.status}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MyBidMessages;
