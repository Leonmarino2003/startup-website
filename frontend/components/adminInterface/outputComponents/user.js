import styles from "./adminOutput.module.css";
import { fetchUser } from "../../../services/backendService";

const UserComponent = ({ data }) => {
  async function renderUser() {

  }

  return (
    <>
      <div
        className={styles.main}
        key={data._id}>
        <button onClick={() => renderUser()}>Render User</button>
        <li>
          <b>Email:</b> {data.email}
        </li>
        <li>
          <b>Id:</b> {data._id}
        </li>
        <li>
          <b>First Name:</b> {data.name?.firstName}
        </li>
        <li>
          <b>Last Name:</b> {data.name?.lastName}
        </li>
        <li>
          <b>Password:</b> {data.password}
        </li>
        <li key={data._id}>
          <b>Bids:</b>{" "}
          {data.bids?.map((bid) => {
            return (
              <div
                onClick={() => console.log(bid)} // Can use onclicks to look at bid info etc..
                key={bid}>
                {bid}
              </div>
            );
          })}
        </li>
        <li>
          <b>
            {" "}
            Birthday: <br></br>Day:{" "}
          </b>
          {data.birthDate?.birthDay} <b>Month:</b> {data.birthDate?.birthMonth}{" "}
          <b>Year: </b> {data.birthDate?.birthYear}
        </li>
        <li>
          <b>Gender:</b> {data.gender}
        </li>
      </div>
    </>
  );
};

export default UserComponent;
