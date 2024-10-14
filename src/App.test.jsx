import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";

import App from "./App";

describe("currency converter tests", () => {
  test("renders converter", () => {
    render(<App />);

    const output = screen.getByTestId("output").textContent;
    expect(output).toContain("0");
  });

  test("Does convertion correctly EUR / USD", () => {
    render(<App />);

    const input = screen.getByTestId("value-input").querySelector("input");
    fireEvent.change(input, { target: { value: "1" } });

    const fixedRateChecked = screen.getByLabelText(
      "Fixer le taux de change",
    ).checked;

    const switchChecked = within(screen.getByTestId("switch")).getByRole(
      "checkbox",
    ).checked;

    const button = screen.getByTestId("convert-button");
    fireEvent.click(button);
    expect(fixedRateChecked).toBe(false);
    expect(switchChecked).toBe(true);

    // value = 1 * changeRate
    const output = screen.getByTestId("output").textContent;
    expect(output).toContain("1.1");
  });

  test("Does convertion correctly USD / EUR", () => {
    render(<App />);

    const input = screen.getByTestId("value-input").querySelector("input");
    fireEvent.change(input, { target: { value: "1" } });

    const fixedRateChecked = screen.getByLabelText(
      "Fixer le taux de change",
    ).checked;

    const switchEl = within(screen.getByTestId("switch")).getByRole("checkbox");

    fireEvent.click(switchEl);

    const button = screen.getByTestId("convert-button");
    fireEvent.click(button);
    expect(fixedRateChecked).toBe(false);

    // value = 1 / changeRate
    const output = screen.getByTestId("output").textContent;
    expect(output).toContain("0.91");
  });
});
