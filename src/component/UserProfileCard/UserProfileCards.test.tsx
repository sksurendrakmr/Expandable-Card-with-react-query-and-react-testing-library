import { screen, waitFor, within } from "@testing-library/react";
import { renderWithQueryProvider } from "../../test-utils";
import { UserProfileCards } from "./UserProfileCards";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { Urls } from "../../config/Urls";

test("should render UserProfileCards component", () => {
  renderWithQueryProvider(<UserProfileCards />);
});

test("should render cards from mock server", async () => {
  renderWithQueryProvider(<UserProfileCards />);
  const cards = await screen.findAllByRole("article");
  expect(cards).toHaveLength(3);
});

test("should render image from mock server", async () => {
  renderWithQueryProvider(<UserProfileCards />);
  const images: HTMLImageElement[] = await screen.findAllByRole("img");
  expect(images).toHaveLength(3);
  const imagesAlt = images.map((image) => image.alt);
  expect(imagesAlt).toStrictEqual(["Bret", "Antonette", "Samantha"]);
});

describe("Card integration", () => {
  test("should click on first card expand the card and show email, address and phone", async () => {
    renderWithQueryProvider(<UserProfileCards />);
    const cards = await screen.findAllByRole("article");
    const firstCardExpandableIcon = within(cards[0]).getByRole("button", {
      name: /show more/i,
    });
    userEvent.click(firstCardExpandableIcon);
    const email = screen.queryByText(/Sincere@april.biz/i);
    const phone = screen.queryByText(/1-770-736-8031 x56442/i);
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
  });
});

describe("error", () => {
  test("should show error", async () => {
    server.resetHandlers(
      rest.get(Urls.USERS, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get(Urls.PHOTOS, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithQueryProvider(<UserProfileCards />);

    await waitFor(async () => {
      const errorText = await screen.findByText(/while retrieving users$/i);
      expect(errorText).toBeInTheDocument();
    });
  });
});

test("should render Loading text", async () => {
  renderWithQueryProvider(<UserProfileCards />);
  const loadingText = await screen.findByText(/Loading.../i);
  expect(loadingText).toBeInTheDocument();
});
