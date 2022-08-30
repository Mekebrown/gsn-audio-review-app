import React from "react";
import { UserContext } from "../tools/helper_functions";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import AdminSingleProject from "./AdminSingleProject";


describe("Admin single media work displays relevant information", () => {
    test('filtering results', () => {
      render(<AdminSingleProject />);

    //   const writeANoteText = screen.getByText(/Write A Note/i);
    //   expect(writeANoteText).toBeInTheDocument();
    });
});
