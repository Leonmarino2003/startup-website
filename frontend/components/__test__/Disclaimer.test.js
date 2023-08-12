import { render, screen } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import Disclaimer from "../Disclaimer.js";

const MockDisclaimer = () => {
  return (
    <Provider store={store}>
      <Disclaimer />
    </Provider>
  );
};

describe("Disclaimer", () => {
  it("renders the disclaimer", () => {
    render(<MockDisclaimer />);
  });

  it("renders the disclaimer text", () => {
    render(<MockDisclaimer />);
    const disclaimerText = screen.getByText(
      /this service is under development/i
    );
  });
});
