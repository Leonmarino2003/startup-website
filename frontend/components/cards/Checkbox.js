import { useState } from "react";

const Checkbox = ({ label, storageKey }) => {
  const [checked, setChecked] = useState(
    localStorage.getItem(storageKey) === "true"
  );

  const handleChange = () => {
    // setChecked(!checked);
    // localStorage.setItem(storageKey, !checked);
    // localStorage.setItem("SplashScreen", "disabled");
    const newValue = !checked;
    setChecked(newValue);
    localStorage.setItem(storageKey, newValue);
    if (newValue) {
      localStorage.setItem("SplashScreen", "disabled");
    } else {
      localStorage.removeItem("SplashScreen");
    }
  };

  return (
    <div className="checkbox">
      <style>
        {`
        .checkbox {
          position: absolute;
          z-index: 10;
          right: 32px;
          bottom: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        `}
      </style>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
