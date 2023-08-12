import styles from "./BidHelp.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../services/fetchService";
import { BiCircle } from "react-icons/bi";
import languagesJson from "../languages.json";
import {
  handleShowBidHelp,
  handleShowPlaceBid,
} from "../redux/slices/componentSlice.js";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { showNewPin } from "../redux/slices/mapSlice";

export default function Feedback() {
  const dispatch = useDispatch();
  const coords = useSelector((state) => {
    return state.map.coords;
  });
  const [address, setAddress] = useState({});
  const [dontShow, setDontShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);
  const [selected4, setSelected4] = useState(null);

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  async function populateAddress(coords) {
    const addressObj = await fetchAddress(coords);
    setAddress(addressObj);
  }

  useEffect(() => {
    populateAddress(coords);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dontShow) {
      localStorage.setItem("BidHelp", "disabled");
    }
    dispatch(handleShowPlaceBid(true));
    dispatch(handleShowBidHelp(false));
  };

  const handleCheckbox = () => {
    setDontShow(!dontShow);
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const toggle2 = (i) => {
    if (selected2 === i) {
      return setSelected2(null);
    }
    setSelected2(i);
  };

  const toggle3 = (i) => {
    if (selected3 === i) {
      return setSelected3(null);
    }
    setSelected3(i);
  };

  const toggle4 = (i) => {
    if (selected4 === i) {
      return setSelected4(null);
    }
    setSelected4(i);
  };

  function handleClosing() {
    if (dontShow) {
      localStorage.setItem("BidHelp", "disabled");
    }
    dispatch(showNewPin(false));
    dispatch(handleShowBidHelp(false));
  }

  const data = [
    {
      question: translations.bidHelpQ1,

      answer: translations.bidHelpA1,
    },
  ];

  const data2 = [
    {
      question: translations.bidHelpQ2,

      answer: translations.bidHelpA2,
    },
  ];

  const data3 = [
    {
      question: translations.bidHelpQ3,

      answer: translations.bidHelpA3,
    },
  ];

  const data4 = [
    {
      question: translations.bidHelpQ4,

      answer: translations.bidHelpA4,
    },
  ];

  return (
    <></>
    
  );
}
