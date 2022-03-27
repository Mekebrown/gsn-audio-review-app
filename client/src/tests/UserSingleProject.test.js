import React from "react";
import axios from "axios";

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"

import UserSingleProject from "../components/User/UserSingleProject";

const MEDIA_NO_RATING = {
  data: [
    {
      // User info
      user_id: 34,
      // Project info
      media_id: 55,
      project_name: "test",
      media_desc: "Draft audio from the public school recording, Jan. 3rd, 2011",
      // Media info
      file_directory: "src/media/audio",
      file_name: "t.mp3",
      // Notes info
      notes: [
        "Note #1 is the first note", 
        "Second note is here", 
        "This will be the third note"
      ],
    }
  ]
};

const MEDIA_WITH_RATING = {
  data: [
    {
      // User info
      user_id: 34,
      // Project info
      media_id: 55,
      project_name: "test",
      media_desc: "Draft audio from the public school recording, Jan. 3rd, 2011",
      // Media info
      file_directory: "src/media/audio",
      file_name: "t.mp3",
      rating: "up",
      // Notes info
      notes: [
        "Note #1 is the first note", 
        "Second note is here", 
        "This will be the third note"
      ],
    }
  ]
};

/**
 * Unit and integration testing since all tests
 * need a running server to work
 * 
 * The goal of these tests is to:
 * - Display correct info in correct locations
 * - Toggle notepad
 * - Sanitize notes
 * - Test out notes list works correctly
 */

// =================TESTS======================= //
describe("individual media project functionality", () => {
  test("media page shows retrieved info", () => {
    jest.mock("axios");
  
    // Need to retrieve user id and all media/notes info
    axios.get.mockResolvedValue({MEDIA_NO_RATING});

    render(<UserSingleProject introUserId={1} />);
  });

  test("media info is in expected locations", () => {
    jest.mock("axios");
  
    // Need to retrieve user id and all media/notes info
    axios.get.mockResolvedValue({MEDIA_NO_RATING});

    render(<UserSingleProject introUserId={1} />);
  });

  test("rating is retrieved", () => {
    jest.mock("axios");
  
    // Need to retrieve user id and all media/notes info
    axios.get.mockResolvedValue({MEDIA_WITH_RATING});

    render(<UserSingleProject introUserId={1} />);
  });
});
