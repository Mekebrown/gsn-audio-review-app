import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import AdminUploadMedia from "./AdminUploadMedia";


describe("Upload media form works as expected", () => {
    test('filtering results', () => {
      render(<AdminUploadMedia />);

    //   const writeANoteText = screen.getByText(/Write A Note/i);
    //   expect(writeANoteText).toBeInTheDocument();
    });
});
