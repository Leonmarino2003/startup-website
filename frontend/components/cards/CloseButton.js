import React from "react";
import { setDisplaySplashScreen } from "../../redux/slices/splashSlice";
import { useDispatch } from "react-redux";
import {
  handleShowLogInForm,
  handleShowLoginSwiper,
  handleShowOverlay,
  handleShowRegisterCardSwiper,
  handleShowLogIn,
} from "../../redux/slices/componentSlice";

export default function CloseButton(componentToClose) {
  const dispatch = useDispatch();
  const HandleClick = (e) => {
    e.preventDefault();
    switch (componentToClose.componentToClose) {
      case "CardsSwiper":
        dispatch(setDisplaySplashScreen(false));
        dispatch(handleShowOverlay(false));
        break;
      case "LoginSwiper":
        dispatch(handleShowLoginSwiper(false));
        dispatch(handleShowOverlay(false));
        break;
      case "RegisterSwiper":
        dispatch(handleShowRegisterCardSwiper(false));
        dispatch(handleShowOverlay(false));
        break;
      case "LoginForm":
        dispatch(handleShowLogInForm(false));
        dispatch(handleShowOverlay(false));
      case "LogIn":
        dispatch(handleShowLogIn(false));
        dispatch(handleShowOverlay(false));
    }
  };

  return (
    <div
      className="close"
      onClick={(e) => HandleClick(e)}>
      <style>
        {`
          .close {
            position: absolute;
            z-index: 10;
            right: 12px;
            top: 12px;
            width: 36px;
            height: 36px;
            cursor: pointer;
            
            background-color: #ccc;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            
            
          }
          .close:hover {
            background-color: #aaa;
            
          }
          .close:before, .close:after {
            position: absolute;
            left: 17px;
            content: ' ';
            height: 15px;
            width: 2px;
            background-color: #838383;
            
          }
          .close:before {
            transform: rotate(45deg);
          }
          .close:after {
            transform: rotate(-45deg);
          }
        `}
      </style>
      <div className="close:before"></div>
      <div className="close:after"></div>
    </div>
  );
}
