import { truncateDB } from "@/test/helpers/truncateDB";
import { db } from "~/db.server";
import { action, inputNames } from "~/routes/start/index";

beforeEach(async () => {
  await truncateDB();
});

describe("Start action", () => {
  test("creates session with 3 default timers and redirects to first timer", async () => {
    const formData = new FormData();
    formData.append(inputNames.focusAmount, "2");
    const response: Response = await action({
      request: new Request("/start", { method: "POST", body: formData }),
      params: {},
      context: {},
    });

    const timers = await db.timer.findMany();
    expect(timers.length).toEqual(3);
    expect(timers?.[0].length).toBe(1500);
    expect(timers?.[1].length).toBe(300);
    expect(timers?.[1].type).toBe("EXERCISE");
    expect(response.status).toEqual(302);
  });

  test("creates session with 5 custom timers and redirects to first timer", async () => {
    const formData = new FormData();
    formData.append(inputNames.focusAmount, "3");
    formData.append(inputNames.focusLength, "2000");
    formData.append(inputNames.breakLength, "400");
    const response: Response = await action({
      request: new Request("/start", { method: "POST", body: formData }),
      params: {},
      context: {},
    });
    const timers = await db.timer.findMany();
    expect(timers.length).toEqual(5);
    expect(timers?.[0].length).toBe(2000);
    expect(timers?.[1].length).toBe(400);
    expect(response.status).toEqual(302);
  });
});
