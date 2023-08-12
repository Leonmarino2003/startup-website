import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import Navbar from "../Navbar.js";

const MockNavbar = () => {
  return (
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
};

describe("Navbar", () => {
  describe("Profile Menu (Right)", () => {
    it("renders the hamburger menu button", () => {
      render(<MockNavbar />);
      const hamburgerButton = screen.getByTestId("navbar-menubars");
    });

    it("does not show the hamburger menu initially", () => {
      render(<MockNavbar />);
      const hamburgerMenu = screen.getByTestId("navbar-hamburgermenu");
      expect(hamburgerMenu).not.toHaveClass("nav_menu active");
    });

    it("makes the hamburger menu active after pressing the button", () => {
      render(<MockNavbar />);
      const hamburgerButton = screen.getByTestId("navbar-menubars");
      const hamburgerMenu = screen.getByTestId("navbar-hamburgermenu");
      fireEvent.click(hamburgerButton);
      expect(hamburgerMenu).toHaveClass("nav_menu active");
    });
  });
});
