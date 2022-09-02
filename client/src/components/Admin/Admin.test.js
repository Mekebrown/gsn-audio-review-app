import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import Admin from "./Admin";


describe("Admin dashboard functionality", () => {
    test('filtering results', () => {
      render(<Admin />);

    //   const writeANoteText = screen.getByText(/Write A Note/i);
    //   expect(writeANoteText).toBeInTheDocument();
    });
});
