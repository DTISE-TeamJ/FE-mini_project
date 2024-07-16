import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "app/_components/Home/Hero/Hero";

jest.mock("use-debounce", () => ({
  useDebounce: jest.fn((value) => [value]),
}));

describe("Hero Component", () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    render(<Hero setSearchTerm={mockSetSearchTerm} />);
  });

  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<Hero setSearchTerm={mockSetSearchTerm} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the main headings", () => {
    expect(screen.getByText("First Class Travel")).toBeInTheDocument();
    expect(screen.getByText("Top 1% Locations Worldwide")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    expect(screen.getByPlaceholderText("Search Event")).toBeInTheDocument();
  });

  // it("renders the search icon", () => {
  //   expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  // });

  // it("renders the background video", () => {
  //   const video = screen.getByTestId("videoPlayer");

  //   expect(video).toBeInTheDocument();
  //   expect(video).toHaveAttribute("src", "/beachVid.mp4");
  //   expect(video).toHaveAttribute("autoplay");
  //   expect(video).toHaveAttribute("loop");
  //   expect(video).toHaveAttribute("muted");
  // });

  it("updates search input value when typed", () => {
    const input = screen.getByPlaceholderText("Search Event");
    fireEvent.change(input, { target: { value: "Beach vacation" } });
    expect(input).toHaveValue("Beach vacation");
  });

  it("calls setSearchTerm after debounce", async () => {
    const input = screen.getByPlaceholderText("Search Event");
    fireEvent.change(input, { target: { value: "Beach vacation" } });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mockSetSearchTerm).toHaveBeenCalledWith("Beach vacation");
  });
});
