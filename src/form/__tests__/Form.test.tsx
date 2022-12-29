import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";

import Form from "../Form";

const renderWithProvider = (
  initialValues?: Parameters<typeof Form>[0]["initialValues"]
) => {
  const client = new QueryClient();
  const Wrapper = ({ children }: { children: React.ReactElement }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  return render(<Form initialValues={initialValues} />, { wrapper: Wrapper });
};

const expectUserOptionsAvailable = async () => {
  await screen.findByRole("option", { name: /Leanne Graham/i });
};

const expectPostOptionsAvailable = async () => {
  await screen.findByRole("option", { name: /sunt aut facere repellat/i });
};

const expectCommentOptionsAvailable = async () => {
  await screen.findByRole("option", { name: /laudantium enim quasi/i });
};

const expectUserOptionSelected = () => {
  expect(
    screen
      .getByRole("option", { name: /Leanne Graham/i })
      .getAttribute("data-selected")
  ).toBe("true");
};

const expectPostOptionSelected = () => {
  expect(
    screen
      .getByRole("option", { name: /sunt aut facere repellat/i })
      .getAttribute("data-selected")
  ).toBe("true");
};

const expectCommentOptionSelected = () => {
  expect(
    screen
      .getByRole("option", { name: /laudantium enim quasi/i })
      .getAttribute("data-selected")
  ).toBe("true");
};

describe("Form", () => {
  it("should render form without values and with options for users", async () => {
    renderWithProvider();
    await expectUserOptionsAvailable();
  });

  it("should render form with user and with options for users and posts", async () => {
    renderWithProvider({ "1": {} });
    await expectUserOptionsAvailable();
    await expectPostOptionsAvailable();
    expectUserOptionSelected();
  });

  it("should render form with user and post and with options for users and posts and comments", async () => {
    renderWithProvider({ "1": { "1": {} } });
    await expectUserOptionsAvailable();
    await expectPostOptionsAvailable();
    await expectCommentOptionsAvailable();
    expectUserOptionSelected();
    expectPostOptionSelected();
  });

  it("should render form with user and post and comment and with options for users and posts and comments", async () => {
    renderWithProvider({ "1": { "1": { "1": {} } } });
    await expectUserOptionsAvailable();
    await expectPostOptionsAvailable();
    await expectCommentOptionsAvailable();
    expectUserOptionSelected();
    expectPostOptionSelected();
    expectCommentOptionSelected();
  });
});
