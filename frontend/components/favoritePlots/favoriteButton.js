import styles from "./favoriteButton.module.css";
import { useState } from "react";
import {
  verifyJWT,
  saveFavoriteProperty,
  removeFavoriteProperty,
  isFavoriteProperty,
} from "../../services/backendService";

import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

function FavoriteButton( {property} ) {
  useState(() => {
    setFavoriteStatus();
  });

  const [isActive, setIsActive] = useState(false);
  const [canClick, setCanClick] = useState(false);

  async function setFavoriteStatus() {
    const isLoggedIn = await verifyJWT();

    if (!isLoggedIn || !isLoggedIn.loggedIn)
      return setCanClick(false);

    if(!property || !property.address)
      return setCanClick(false);
    
    const body = await favoritePropertyBody();

    const result = await isFavoriteProperty(body);

    setIsActive(result.isFavoriteProperty ? true : false); // Set the favorite status of button

    setCanClick(true); // Enable the button
  }

  async function addFavoriteProperty() {
    const body = await favoritePropertyBody();

    if (!body) return;
    let result = await saveFavoriteProperty(body);

    console.log(result.msg);
    setIsActive(true);
  }

  async function _removeFavoriteProperty() {
    const body = await favoritePropertyBody();
    const result = await removeFavoriteProperty(body);
    console.log(result.msg);
    setIsActive(false);
  }

  async function favoritePropertyBody() {
    const isLoggedIn = await verifyJWT();
    if (isLoggedIn) {
      if (!isLoggedIn.loggedIn) return;
    }

    return {
      user: isLoggedIn.user,
      address: property.address,
    };
  }

  return <div className={styles.icon}>
    {canClick ? (
      isActive ? (
        <AiTwotoneHeart
          color="darkred"
          size={30}
          onClick={() => {
            _removeFavoriteProperty();
          }}
        />
      ) : (
        <AiOutlineHeart
          size={30}
          onClick={() => {
            addFavoriteProperty();
          }}
        />
      )
    ) : (
      <AiOutlineHeart color="darkgrey" size={30}  />
    )
  }
  </div>
}

export default FavoriteButton;
