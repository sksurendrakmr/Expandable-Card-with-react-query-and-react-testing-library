import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getUserProfileProps } from "../../App";
import { UserProfileCard } from "./UserProfileCard";

test("should render userProfile card", () => {
  render(<UserProfileCard {...getUserProfileProps()} />);
});

test("should render image in the card", () => {
  render(<UserProfileCard {...getUserProfileProps()} />);
  const imageElement = screen.getByAltText(/sksuri/i);
  expect(imageElement).toBeInTheDocument();
});

test("should render name and username and website below image", () => {
  render(<UserProfileCard {...getUserProfileProps()} />);
  const userText = screen.getByText(/Surendra Kumar/i);
  const userName = screen.getByText(/@sksuri/i);
  const website = screen.getByText(/sk.com/i);
  expect(userText).toBeInTheDocument();
  expect(userName).toBeInTheDocument();
  expect(website).toBeInTheDocument();
});

test("should render expandable button", () => {
  render(<UserProfileCard {...getUserProfileProps()} />);
  const collapseableButton = screen.getByRole("button", { name: "show more" });
  expect(collapseableButton).toBeInTheDocument();
  expect(collapseableButton).toHaveStyle({ transform: "rotate(0deg)" });
});

test("should not display phone, email and address", () => {
  render(<UserProfileCard {...getUserProfileProps()} />);
  const phone = screen.queryByText(/990909090/i);
  const email = screen.queryByText(/sk@gmail.com/i);
  const address = screen.queryByText(/bbsr/i);
  expect(phone).not.toBeInTheDocument();
  expect(email).not.toBeInTheDocument();
  expect(address).not.toBeInTheDocument();
});

test("should expand the card on click of expandable button", () => {
  render(<UserProfileCard {...getUserProfileProps()} />);
  const expandableButton = screen.getByRole("button", { name: "show more" });
  userEvent.click(expandableButton);
  expect(expandableButton).toHaveStyle({ transform: "rotate(180deg)" });
  const phone = screen.queryByText(/990909090/i);
  const email = screen.queryByText(/sk@gmail.com/i);
  const address = screen.queryByText(/bbsr/i);
  expect(phone).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(address).toBeInTheDocument();
});
