import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import AdminShowAllProjects from "./AdminShowAllProjects";


describe("All projects show up properly", () => {
    test('all projects', () => {
      render(<AdminShowAllProjects />);

    //   const writeANoteText = screen.getByText(/Write A Note/i);
    //   expect(writeANoteText).toBeInTheDocument();
    });
});
