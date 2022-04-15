import { File, Project } from "@prisma/client";

describe("API", () => {
  beforeEach(() => {
    cy.resetDB();
    cy.login();
  });

  it("should retrieve file from project if present", () => {
    cy.factory({
      name: "project1",
      type: "Project",
    }).then((project: Project) => {
      cy.factory({
        name: "file1",
        type: "File",
        attrs: { project: { connect: { id: project.id } } },
      });
    });

    cy.data("project1").then((project: Project) => {
      cy.data("file1").then((file: File) => {
        cy.request("GET", `/v1/${project.id}/${file.id}`).then((resp) => {
          expect(resp.headers["content-type"]).to.eq("image/png");
        });
      });
    });
  });
});
