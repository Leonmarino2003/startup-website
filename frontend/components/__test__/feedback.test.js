import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";
import Feedback from "../feedback.js";

const MockFeedback = () => {
  return (
    <Provider store={store}>
      <Feedback />
    </Provider>
  );
};

describe("Feedback", () => {
  it("renders the feedback component", () => {
    render(<MockFeedback />);
  });

  it("renders the feedback header", () => {
    render(<MockFeedback />);
    const feedbackHeader = screen.getByText(
      /we always want to improve, please tell us how./i
    );
  });

  it("renders the feedback input field", () => {
    render(<MockFeedback />);
    const feedbackInput = screen.getByRole("textbox");
  });

  it("renders the submit button", () => {
    render(<MockFeedback />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
  });

  it("renders the five stars as unselected initially", () => {
    render(<MockFeedback />);
    const outlineStars = screen.getAllByTestId(/outlinestar/i);
    expect(outlineStars).toHaveLength(5);
  });

  it("renders the first star as selected when clicked", () => {
    render(<MockFeedback />);
    const firstStarButton = screen.getByTestId("star1");
    fireEvent.click(firstStarButton);
    const firstStar = screen.getByTestId("fillstar1");
  });

  it("still renders the other 4 stars as unselected after clicking the first star", () => {
    render(<MockFeedback />);
    const firstStarButton = screen.getByTestId("star1");
    fireEvent.click(firstStarButton);
    const outlineStars = screen.getAllByTestId(/outlinestar/i);
    expect(outlineStars).toHaveLength(4);
  });

  it("renders all five stars as selected after clicking the fifth star", () => {
    render(<MockFeedback />);
    const lastStarButton = screen.getByTestId("star5");
    fireEvent.click(lastStarButton);
    const outlineStars = screen.getAllByTestId(/fillstar/i);
    expect(outlineStars).toHaveLength(5);
  });

  it("changes the feedback input", () => {
    render(<MockFeedback />);
    const feedbackInput = screen.getByRole("textbox");
    const testValue = "test feedback";

    fireEvent.change(feedbackInput, { target: { value: testValue } });
    expect(feedbackInput.value).toBe(testValue);
  });
});
