// src/Button.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./button";
import jest from  "jest-mock"
import { expect, test } from "@jest/globals";

test("renders button with label", () => {
  render(<Button label="Click Me" onClick={() => {}} />);
  
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = jest?.fn();
  render(<Button label="Click Me" onClick={handleClick} />);
  
  const buttonElement = screen.getByText(/Click Me/i);
  fireEvent.click(buttonElement);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
