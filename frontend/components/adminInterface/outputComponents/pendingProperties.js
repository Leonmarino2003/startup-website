import React from "react";
import styles from "./adminOutput.module.css";
import {
  denyPendingPropertyById,
  registerPropertyOwner,
} from "../../../services/backendService";

async function _registerPropertyOwner(pendingPropertyId, userId) {
  const body = {
    userId: userId,
    pendingPropertyId: pendingPropertyId,
  };
  console.log("body: ", body);
  const registerRes = await registerPropertyOwner(body);
  if (!registerRes.success) return console.log(registerRes.msg);

  console.log("Property registered and pending property deleted");
}

const PendingProperty = (pendingProperty) => {
  return !pendingProperty ? (
    <div className={styles.main}>
      No pending properties found with the given property _id
    </div>
  ) : (
    <div>
      {console.log("data: ", pendingProperty)}
      <div className={styles.main}>
        <li>
          <b> Pending property id:</b> {pendingProperty.data.pendingProperty.id}
        </li>
        <li>
          <b>Street:</b> {pendingProperty.data.property.address.street}
        </li>
        <li>
          <b>PostCode:</b> {pendingProperty.data.property.address.postcode}
        </li>
        <li>
          <b>City:</b> {pendingProperty.data.property.address.city}
        </li>
        <li>
          <b>Country:</b> {pendingProperty.data.property.address.city}
        </li>
        <button
          onClick={async () => {
            await _registerPropertyOwner(
              pendingProperty.data.pendingProperty.id,
              pendingProperty.data.user.id
            );
          }}>
          Accept (Confirm)
        </button>

        <button
          onClick={async () => {
            await denyPendingPropertyById(
              pendingProperty.data.pendingProperty.id
            );
          }}>
          Delete{" "}
        </button>
      </div>
    </div>
  );
};

export default PendingProperty;
