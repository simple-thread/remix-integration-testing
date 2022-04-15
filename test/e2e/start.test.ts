describe("Create Timer", () => {
  beforeEach(() => {
    cy.resetDB();
    cy.login();
  });

  it("should create a session", () => {
    cy.request("POST", `/start`, {}).then((resp) => {
      expect(resp.headers["content-type"]).to.eq("image/png");
    });
  });
});
