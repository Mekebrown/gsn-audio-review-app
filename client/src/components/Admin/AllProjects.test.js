import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import AllProjects from "./AllProjects";


describe("All projects show up properly", () => {
    test('all projects', () => {
      render(<AllProjects />);

    //   const writeANoteText = screen.getByText(/Write A Note/i);
    //   expect(writeANoteText).toBeInTheDocument();
    });
});
