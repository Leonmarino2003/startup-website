import { render, screen, fireEvent, act } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import ChangePassword from "../settings/Security/ChangePassword.js";

const MockChangePassword = () => {
  return (
    <Provider store={store}>
      <ChangePassword />
    </Provider>
  );
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        success: true,
      }),
  })
);

describe("Change Password", () => {
  it("renders the change password component", () => {
    render(<MockChangePassword />);
  });

  it("renders the change password header", () => {
    render(<MockChangePassword />);
    const changePwHeader = screen.getByRole("heading", {
      name: /change password/i,
    });
  });

  it("renders the current password input field", () => {
    render(<MockChangePassword />);
    const currentPwInput = screen.getByTitle("currentpassword");
  });

  it("renders the new password input field", () => {
    render(<MockChangePassword />);
    const newPwInput = screen.getByTitle("newpassword");
  });

  it("renders the change password button", () => {
    render(<MockChangePassword />);
    const changePwButton = screen.getByRole("button", {
      name: /change password/i,
    });
  });

  describe("Show password", () => {
    it("renders the show password checkbox", () => {
      render(<MockChangePassword />);
      const showPwCheckbox = screen.getByRole("checkbox");
    });

    it("renders the show password text", () => {
      render(<MockChangePassword />);
      const showPwCheckbox = screen.getByText(/show password/i);
    });

    it("hides the current password initially", () => {
      render(<MockChangePassword />);
      const currentPwInput = screen.getByTitle("currentpassword");
      expect(currentPwInput).toHaveAttribute("type", "password");
    });

    it("hides the new password initially", () => {
      render(<MockChangePassword />);
      const newPwInput = screen.getByTitle("newpassword");
      expect(newPwInput).toHaveAttribute("type", "password");
    });

    it("shows the current password after clicking the checkbox", () => {
      render(<MockChangePassword />);
      const currentPwInput = screen.getByTitle("currentpassword");
      const showPwCheckbox = screen.getByRole("checkbox");
      fireEvent.click(showPwCheckbox);
      expect(currentPwInput).toHaveAttribute("type", "text");
    });

    it("shows the new password after clicking the checkbox", () => {
      render(<MockChangePassword />);
      const newPwInput = screen.getByTitle("newpassword");
      const showPwCheckbox = screen.getByRole("checkbox");
      fireEvent.click(showPwCheckbox);
      expect(newPwInput).toHaveAttribute("type", "text");
    });
  });

  it("changes the current password input", () => {
    render(<MockChangePassword />);
    const currentPwInput = screen.getByTitle("currentpassword");
    const testValue = "test";

    fireEvent.change(currentPwInput, { target: { value: testValue } });
    expect(currentPwInput.value).toBe(testValue);
  });

  it("changes the new password input", () => {
    render(<MockChangePassword />);
    const newPwInput = screen.getByTitle("newpassword");
    const testValue = "test";

    fireEvent.change(newPwInput, { target: { value: testValue } });
    expect(newPwInput.value).toBe(testValue);
  });

  it("displays success upon submitting new password", async () => {
    await act(async () => {
      render(<MockChangePassword />);
    });
    const currentPwInput = screen.getByTitle("currentpassword");
    const newPwInput = screen.getByTitle("newpassword");
    const changePwButton = screen.getByRole("button", {
      name: /change password/i,
    });
    fireEvent.change(currentPwInput, { target: { value: "currentpassword" } });
    fireEvent.change(newPwInput, { target: { value: "newpassword" } });
    await act(async () => {
      fireEvent.click(changePwButton);
    });
    const successMsg = screen.getByText(
      /your password was successfully reset!/i
    );
  });
});
