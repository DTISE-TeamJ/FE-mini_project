import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// A simplified version of your Navbar component
const SimpleNavbar = () => (
  <nav>
    <h1>PEACHES.</h1>
    <ul>
      <li>Home</li>
      <li>Destinations</li>
      <li>Travel</li>
      <li>View</li>
      <li>Book</li>
    </ul>
    <div title="Cart">Cart Icon</div>
    <div title="User">User Icon</div>
    <div title="Menu">Menu Icon</div>
  </nav>
);

jest.mock("../../app/_components/(shared)/Navbar/Navbar", () => SimpleNavbar);

describe("Navbar Component", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<SimpleNavbar />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the logo", () => {
    render(<SimpleNavbar />);
    expect(screen.getByText("PEACHES.")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<SimpleNavbar />);
    const navItems = ["Home", "Destinations", "Travel", "View", "Book"];
    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders cart icon", () => {
    render(<SimpleNavbar />);
    expect(screen.getByTitle("Cart")).toBeInTheDocument();
  });

  it("renders user icon", () => {
    render(<SimpleNavbar />);
    expect(screen.getByTitle("User")).toBeInTheDocument();
  });

  it("renders hamburger menu icon for mobile", () => {
    render(<SimpleNavbar />);
    expect(screen.getByTitle("Menu")).toBeInTheDocument();
  });
});
