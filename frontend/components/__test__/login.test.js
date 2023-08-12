import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import Login from "../login.js";

const MockLogin = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: "",
        user: "",
      }),
  })
);

describe("Login", () => {
  it("renders the login component", () => {
    render(<MockLogin />);
  });

  it("renders the log in button", () => {
    render(<MockLogin />);
    const loginButton = screen.getByRole("button", { name: /log in/i });
  });

  it("renders the email input", () => {
    render(<MockLogin />);
    const emailInput = screen.getByTitle(/email/i);
  });

  it("renders the password input", () => {
    render(<MockLogin />);
    const passwordInput = screen.getByTitle(/password/i);
  });

  it("changes the password input", () => {
    render(<MockLogin />);
    const passwordInput = screen.getByTitle(/password/i);
    const testValue = "test";

    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput.value).toBe(testValue);
  });

  it("changes the email input", () => {
    render(<MockLogin />);
    const emailInput = screen.getByTitle(/email/i);
    const testValue = "test";

    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe(testValue);
  });

  it("renders the loading icon on submit", () => {
    act(() => {
      render(<MockLogin />);
    });
    const emailInput = screen.getByTitle(/email/i);
    const passwordInput = screen.getByTitle(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });
    fireEvent.change(emailInput, { target: { value: "myemail@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "anypassword" } });
    act(() => {
      fireEvent.click(loginButton);
    });
    const loadIcon = screen.getByTitle(/loaderspan/i);
    expect(loadIcon).toHaveClass("loader");
  });

  it("displays an error if login fails", async () => {
    await act(async () => {
      render(<MockLogin />);
    });
    const emailInput = screen.getByTitle(/email/i);
    const passwordInput = screen.getByTitle(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });
    fireEvent.change(emailInput, { target: { value: "incorrect@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    await act(async () => {
      fireEvent.click(loginButton);
    });
    const errorMsg = screen.getByText(/wrong user credentials/i);
  });
});
