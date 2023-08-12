import { render, screen } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import BidSuccess from "../bidsuccess.js";

const MockBidSuccess = () => {
  return (
    <Provider store={store}>
      <BidSuccess />
    </Provider>
  );
};

describe("Bid Success", () => {
  it("renders the bid success component", () => {
    render(<MockBidSuccess />);
  });

  it("renders the bid success header", () => {
    render(<MockBidSuccess />);
    const disclaimerHeader = screen.getByText(/registered!/i);
  });

  it("renders the bid success text", () => {
    render(<MockBidSuccess />);
    const disclaimerText = screen.getByText(
      /your bid is now being presented to the owner/i
    );
  });
});
