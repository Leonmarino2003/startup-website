import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import ChangeCurrency from "../settings/paymentAndPoints/ChangeCurrency.js";

const MockChangeCurrency = () => {
  return (
    <Provider store={store}>
      <ChangeCurrency />
    </Provider>
  );
};

describe("Change Currency", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("renders the change currency component", () => {
    render(<MockChangeCurrency />);
  });

  it("renders the header", () => {
    render(<MockChangeCurrency />);
    const changeCurrencyHeader = screen.getByText(/currency/i);
  });

  it("renders the euro button", () => {
    render(<MockChangeCurrency />);
    const euroButton = screen.getByRole("button", { name: /eur/i });
  });

  it("renders the sek button", () => {
    render(<MockChangeCurrency />);
    const sekButton = screen.getByRole("button", { name: /sek/i });
  });

  it("marks sek as selected initially", () => {
    render(<MockChangeCurrency />);
    const selectedIcon = screen.getByTestId(/sek-selected/i);
  });

  it("does not mark euro as selected initially", () => {
    render(<MockChangeCurrency />);
    const selectedIcon = screen.queryByTestId(/eur-selected/i);
    expect(selectedIcon).not.toBeInTheDocument();
  });

  it("marks euro as selected when clicked", () => {
    render(<MockChangeCurrency />);
    const euroButton = screen.getByRole("button", { name: /eur/i });
    fireEvent.click(euroButton);
    const selectedIcon = screen.getByTestId(/eur-selected/i);
  });
});
