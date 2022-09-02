import { render, fireEvent, screen } from "@testing-library/react";
import Home from "./Home";

test("name and password are required", () => {
    render(<Home />);

    const inputName = screen.getByTitle("unField");
    const inputPW = screen.getByTitle("pwField");
    const loginUserMsg = screen.getByTitle("userMsg");
    const submitBtn = screen.getByTitle("submit");
    
    fireEvent.change(inputName, {target: {value: "snacks"}});
    expect(loginUserMsg.textContent).toBe("");

    fireEvent.change(inputPW, {target: {value: "galoreeeee"}});
    expect(loginUserMsg.textContent).toBe("");
});
