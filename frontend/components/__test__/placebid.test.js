import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import Placebid from "../placebid.js";

const MockPlacebid = () => {
  return (
    <Provider store={store}>
      <Placebid />
    </Provider>
  );
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        street: "Nulla Nulla Street",
        postcode: "Nulla Nulla Road",
        city: "Nulla Nulla Canyon",
        country: "Nulla Nulla Land",
      }),
  })
);

describe("Place bid", () => {
  it("renders the place bid component", () => {
    render(<MockPlacebid />);
  });
});
