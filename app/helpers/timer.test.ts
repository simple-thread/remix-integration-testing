import { timerString } from "./timer";

describe("Timer helper", () => {
  it("timerString(0) should return zero string", () => {
    expect(timerString(0)).toEqual("00:00");
  });
});
