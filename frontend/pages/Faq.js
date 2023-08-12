import styles from "../components/faq/faq.module.css";
import {
  hideAll,
  handleShowSettings,
  handleShowOverlay,
} from "../redux/slices/componentSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaAngleDoubleDown } from "react-icons/fa";
import languagesJson from "../languages.json";
import TopNav from "../components/topNav";
import ComponentHandler from "../components/componenthandler";

//import FaqMessageService from "../services/FaqMessageService";

function Faq() {
  const PopUp = (props) => {
    return (
      <div className={styles.popupbox}>
        <div className={styles.box}>
          <span
            className={styles.closeicon}
            onClick={props.handleClose}>
            <FaAngleDoubleDown />
          </span>
          {props.content}
        </div>
      </div>
    );
  };

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);
  const [selected4, setSelected4] = useState(null);
  const [selected5, setSelected5] = useState(null);
  // Search the faq-Questions
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allmessages, setAllmessages] = useState([]);
  const [messages, setMessages] = useState({
    nameOfSender: "",
    phone: "",
    emailOfSender: "",
    message: "",
  });
  const coords = useSelector((state) => {
    return state.map.coords;
  });

  // Change language support
  let languageToUse = useSelector((state) => {
    return state.user.language;
  });
  const translations = languagesJson[languageToUse];

  //Function for backend
  /* useEffect(() => {
        getAllMessages();
    }, [])

    const getAllMessages = () => {
        FaqMessageService.getAllMessages().then((response) => {
        setAllmessages(response.data);
        })
    } */

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMessages({ ...messages, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      messages.nameOfSender &&
      messages.phone &&
      messages.emailOfSender &&
      messages.message
    ) {
      const newMessage = messages;
      FaqMessageService.createMessage(newMessage).then(() => getAllMessages());
      setMessages({
        nameOfSender: "",
        phone: "",
        emailOfSender: "",
        message: "",
      });
    }
  };

  //Toggles for the different faq sections
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
    } else if (i === 0) {
      setSelected(0);
    } else {
      setSelected(i);
    }
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

  const toggle5 = (i) => {
    if (selected5 === i) {
      return setSelected5(null);
    }
    setSelected5(i);
  };

  const showSidebar = () => {
    // dispatch(hideAll());

    console.log("Menu clicked");
    dispatch(handleShowSettings(true));
    dispatch(handleShowOverlay(true));
  };

  //Insert questions and answers for Bid section here
  const dataBids = [
    {
      question: translations.faqBidsQ0,
      answer: translations.faqBidsA0,
    },
    {
      question: translations.faqBidsQ1,
      answer: translations.faqBidsA1,
    },
    // {
    //   question: translations.faqBidsQ2,
    //   answer: translations.faqBidsA2,
    // },
    {
      question: translations.faqBidsQ3,
      answer: translations.faqBidsA3,
    },
    // {
    //   question: translations.faqBidsQ4,
    //   answer: translations.faqBidsA4,
    // },
    // {
    //   question: translations.faqBidsQ5,
    //   answer: translations.faqBidsA5,
    // },
    // {
    //   question: translations.faqBidsQ6,
    //   answer: translations.faqBidsA6,
    // },

    {
      question: translations.faqBidsQ9,
      answer: translations.faqBidsA9,
    },
    {
      question: translations.faqBidsQ8,
      answer: translations.faqBidsA8,
    },
    {
      question: translations.faqBidsQ7,
      answer: translations.faqBidsA7,
    },
    {
      question: translations.faqBidsQ10,
      answer: translations.faqBidsA10,
    },
    // {
    //   question: translations.faqBidsQ11,
    //   answer: translations.faqBidsA11,
    // },
  ];

  //Insert questions and answers for Plot section here
  const dataPlot = [
    {
      question: translations.faqPlotQ1,
      answer: translations.faqPlotA1,
    },
    {
      question: translations.faqPlotQ2,
      answer: translations.faqPlotA2,
    },
    {
      question: translations.faqPlotQ3,
      answer: translations.faqPlotA3,
    },
  ];

  //Insert questions and answers for Account section here
  const dataAcc = [
    {
      question: translations.faqAccQ1,
      answer: translations.faqAccA1,
    },
    {
      question: translations.faqAccQ2,
      answer: translations.faqAccA2,
    },
    // {
    //   question: translations.faqAccQ3,
    //   answer: translations.faqAccA3,
    // },
    // {
    //   question: translations.faqAccQ4,
    //   answer: translations.faqAccA4,
    // },
    // {
    //   question: translations.faqAccQ5,
    //   answer: translations.faqAccA5,
    // },
    // {
    //   question: translations.faqAccQ6,
    //   answer: translations.faqAccA6,
    // },
  ];

  //Insert questions and answers for Points section here
  const dataPoints = [
    {
      question: translations.faqPointsQ1,
      answer: translations.faqPointsA1,
    },
    {
      question: translations.faqPointsQ2,
      answer: translations.faqPointsA2,
    },
  ];

  //Insert questions and answers for Other section here
  const dataOther = [
    /*     {
      question: translations.faqOtherQ1,
      answer: translations.faqOtherA1,
    }, */
    /*     {
      question: translations.faqOtherQ2,
      answer: translations.faqOtherA2,
    }, */
    // {
    //   question: translations.faqOtherQ3,
    //   answer: translations.faqOtherA3,
    // },
    // {
    //   question: translations.faqOtherQ4,
    //   answer: translations.faqOtherA4,
    // },
    {
      question: translations.faqOtherQ1,
      answer: translations.faqOtherA1,
    },
    {
      question: translations.faqOtherQ2,
      answer: translations.faqOtherA2,
    },
    {
      question: translations.faqOtherQ5,
      answer: translations.faqOtherA5,
    },
    {
      question: translations.faqOtherQ6,
      answer: translations.faqOtherA6,
    },
    // {
    //   question: translations.faqOtherQ7,
    //   answer: translations.faqOtherA7,
    // },
    {
      question: translations.faqOtherQ8,
      answer: translations.faqOtherA8,
    },
    {
      question: translations.faqOtherQ9,
      answer: translations.faqOtherA9,
    },
  ];

  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  }

  return (
    <>
      <TopNav />
      <ComponentHandler />

      <div
        className={styles.wrapper}
        onClick={() => {
          dispatch(hideAll());
        }}>
        <div className={styles.header}></div>
        <div className={styles.flexRow}>
          <Image
            alt=""
            width={100}
            height={100}
            src="/Faq.svg"
          />
          <h2>{translations.faq}</h2>
        </div>
        {/* searchBar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search FAQs"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className={styles.accordion}>
            <h2>{translations.bid}</h2>
            {dataBids
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )

              .map((item, i) => (
                <div
                  key={"bids-" + i}
                  className={
                    selected === i ? styles.itemSelected : styles.item
                  }>
                  <div
                    className={styles.title}
                    onClick={() => toggle(i)}>
                    <h3>{item.question}</h3>
                    <span>
                      {selected === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>
                  <div
                    className={
                      selected === i ? styles.contentshow : styles.content
                    }>
                    {i === 0 ? (
                      <div className={styles.firstItem}>
                        <div>
                          <p>{translations.faqBidsQ01}</p>
                          <p1>{translations.faqBidsA01}</p1>
                          <Image
                            alt=""
                            width={100}
                            height={100}
                            src="/map-intro.svg"
                          />
                        </div>
                        <div>
                          <p>{translations.faqBidsQ02}</p>
                          <p1>{translations.faqBidsA02}</p1>
                          <Image
                            alt=""
                            width={100}
                            height={100}
                            src="/Girl_holding_sign.svg"
                          />
                        </div>
                        <div>
                          <p>{translations.faqBidsQ03}</p>

                          <Image
                            alt=""
                            width={100}
                            height={100}
                            src="/pickPlot-intro.svg"
                          />
                        </div>
                        <div>
                          <p>{translations.faqBidsQ03}</p>

                          <Image
                            alt=""
                            width={100}
                            height={100}
                            src="/place-bid.svg"
                          />
                        </div>
                      </div>
                    ) : (
                      <h4>{item.answer}</h4>
                    )}
                  </div>
                </div>
              ))}
            {/* <h2>{translations.myPlots}</h2> */}
            {/* {dataPlot
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, i) => (
                <div
                  key={"plot-" + i}
                  className={styles.item}>
                  <div
                    className={styles.title}
                    onClick={() => toggle2(i)}>
                    <h3>{item.question}</h3>
                    <span>
                      {selected2 === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>
                  <div
                    className={
                      selected2 === i ? styles.contentshow : styles.content
                    }>
                    {item.answer}
                  </div>
                </div>
              ))} */}
            <h2>{translations.account}</h2>
            {dataAcc
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, i) => (
                <div
                  key={"account-" + i}
                  className={
                    selected3 === i ? styles.itemSelected : styles.item
                  }>
                  <div
                    className={styles.title}
                    onClick={() => toggle3(i)}>
                    <h3>{item.question}</h3>
                    <span>
                      {selected3 === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>
                  <div
                    className={
                      selected3 === i ? styles.contentshow : styles.content
                    }>
                    <h4>{item.answer}</h4>
                  </div>
                </div>
              ))}
            {/* <h2>{translations.plotPoints}</h2> */}
            {/* {dataPoints
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, i) => (
                <div
                  key={"points-" + i}
                  className={styles.item}>
                  <div
                    className={styles.title}
                    onClick={() => toggle4(i)}>
                    <h3>{item.question}</h3>
                    <span>
                      {selected4 === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>
                  <div
                    className={
                      selected4 === i ? styles.contentshow : styles.content
                    }>
                    {item.answer}
                  </div>
                </div>
              ))} */}
            <h2>{translations.other}</h2>
            {dataOther
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, i) => (
                <div
                  key={"other-" + i}
                  className={
                    selected5 === i ? styles.itemSelected : styles.item
                  }>
                  <div
                    className={styles.title}
                    onClick={() => toggle5(i)}>
                    <h3>{item.question}</h3>
                    <span>
                      {selected5 === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>
                  <div
                    className={
                      selected5 === i ? styles.contentshow : styles.content
                    }>
                    <h4>{item.answer}</h4>
                  </div>
                </div>
              ))}

            <p>{translations.moreQuestions}</p>
            <br></br>
            <input
              type="button"
              value={translations.contactUs}
              onClick={togglePopup}
            />
            {isOpen && (
              <PopUp
                content={
                  <>
                    <b>{translations.insertInfo}</b>
                    <div>
                      <form>
                        <input
                          onChange={handleChange}
                          name="nameOfSender"
                          type="text"
                          value={messages.nameOfSender}
                          placeholder={translations.firstAndLastname}
                        />
                        <br></br>
                        <input
                          onChange={handleChange}
                          name="phone"
                          type="text"
                          value={messages.phone}
                          placeholder={translations.phone}
                        />
                        <br></br>
                        <input
                          onChange={handleChange}
                          name="emailOfSender"
                          type="text"
                          value={messages.emailOfSender}
                          placeholder="Email"
                        />
                        <br></br>
                        <input
                          onChange={handleChange}
                          name="message"
                          type="text"
                          value={messages.message}
                          placeholder={translations.writeQuestion}
                        />
                        <br></br>
                        <button
                          type="submit"
                          onClick={handleSubmit}>
                          <FaEnvelope /> {translations.feedbackSendBtn}
                        </button>
                      </form>
                    </div>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
            <br></br>
            <Link href="/">
              <button
                className={styles.backBtn}
                onClick>
                <FaArrowLeft size={30} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
