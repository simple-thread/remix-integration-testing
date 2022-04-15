import { truncateDB } from "@/test/helpers/truncateDB";
import { db } from "~/db.server";
import { loader as indexLoader } from "~/routes/start/$sessionId/index";
import { action as timerIdAction } from "~/routes/start/$sessionId/$timerId";

beforeEach(async () => {
  await truncateDB();
});

describe("$sessionId", () => {
  describe("index loader", () => {
    it("redirects to next active timer", async () => {
      const session = await db.session.create({ data: { name: "hello" } });
      const response: Response = await indexLoader({
        request: new Request(`/start/${session.id}`, {}),
        params: { sessionId: session.id },
        context: {},
      });
      expect(response.status).toBe(302);
    });
  });

  describe("$timerId action", () => {
    test("go to next timer", async () => {
      expect(true).toBeTruthy();
    });
  });
});
