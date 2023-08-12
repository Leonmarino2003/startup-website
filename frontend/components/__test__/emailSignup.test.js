import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import EmailSignup from "../emailSignup.js";

const MockEmailSignup = () => {
  return (
    <Provider store={store}>
      <EmailSignup />
    </Provider>
  );
};

describe("Email Signup", () => {
  it("renders the signup component", () => {
    render(<MockEmailSignup />);
  });

  it("renders the register button", () => {
    render(<MockEmailSignup />);
    const registerButton = screen.getByRole("button", { name: /register/i });
  });

  it("renders the email input", () => {
    render(<MockEmailSignup />);
    const emailInput = screen.getByTitle(/email/i);
  });

  it("renders the log in here button", () => {
    render(<MockEmailSignup />);
    const loginHereButton = screen.getByRole("button", {
      name: /log in here/i,
    });
  });

  it("changes the email input", () => {
    render(<MockEmailSignup />);
    const emailInput = screen.getByTitle(/email/i);
    const testValue = "test";

    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe(testValue);
  });
});
