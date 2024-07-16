import React from "react";
import { render, screen } from "@testing-library/react";
// import Footer from "../Footer";
import Footer from "app/_components/(shared)/Footer/Footer";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

describe("Footer Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("renders the company name", () => {
    render(<Footer />);
    const heading = screen.getByTestId("headingFooter");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("PEACHES.");
  });

  it("displays the correct office address", () => {
    render(<Footer />);
    expect(screen.getByText("Abbey Road")).toBeInTheDocument();
    expect(screen.getByText("London NW8 9AY")).toBeInTheDocument();
    expect(screen.getByText("United Kingdom")).toBeInTheDocument();
  });

  it("shows the correct email and phone number", () => {
    render(<Footer />);
    expect(screen.getByText("belandajuara@gmail.co.nl")).toBeInTheDocument();
    expect(screen.getByText("+44 20 1234 5678")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Footer />);
    const links = ["Home", "Services", "About Us", "Features", "Contacts"];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("includes a newsletter form", () => {
    render(<Footer />);
    expect(
      screen.getByPlaceholderText("Enter your email id")
    ).toBeInTheDocument();
  });

  // it("displays social media icons", () => {
  //   render(<Footer />);
  //   expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
  //   expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument();
  //   expect(screen.getByRole("link", { name: /youtube/i })).toBeInTheDocument();
  //   expect(
  //     screen.getByRole("link", { name: /instagram/i })
  //   ).toBeInTheDocument();
  // });

  it("shows the correct copyright text", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `Mini Project - Team J © ${currentYear} - All Rights Reserved`
      )
    ).toBeInTheDocument();
  });
});
