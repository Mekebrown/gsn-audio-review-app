import React from "react";
import { UserContext } from "../tools/helper_functions";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import Admin from "./Admin";


describe("Admin dashboard functionality", () => {
    test('filtering results', () => {
      render(
            <UserContext.Provider value={1}>
                <Admin />
            </UserContext.Provider>
        );

    //   const writeANoteText = screen.getByText(/Write A Note/i);
    //   expect(writeANoteText).toBeInTheDocument();
    });
});
