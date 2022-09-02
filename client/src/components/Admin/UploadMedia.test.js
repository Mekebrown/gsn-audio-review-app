import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import UploadMedia from "./UploadMedia";


describe("Upload media form works as expected", () => {
    test('filtering results', () => {
      render(<UploadMedia />);

    //   const writeANoteText = screen.getByText(/Write A Note/i);
    //   expect(writeANoteText).toBeInTheDocument();
    });
});
