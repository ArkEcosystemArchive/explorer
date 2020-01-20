describe("Delegates", () => {
  it("should show 25 rows in the table", () => {
    cy.visit("/delegates/1");
    cy.get("table.vgt-table tbody tr").should("have.length", 25);
  });

  it("should be possible to sort the table", () => {
    cy.get("div.max-w-2xl").then($body => {
      if ($body.find("table").length) {
        cy.get("th")
          .eq(1)
          .as("username")
          .should("exist");
        cy.get("@username")
          .should("contain.text", "Username");

        cy.get("@username").should("not.have.class", "sorting-asc");
        cy.get("@username").should("not.have.class", "sorting-desc");

        cy.get("@username").click();
        cy.get("@username").should("have.class", "sorting-asc");

        cy.get("@username").click();
        cy.get("@username").should("have.class", "sorting-desc");
      }
    });
  });

  it("should be possible to navigate to the next page and back", () => {
    cy.get("div.max-w-2xl").then($body => {
      if ($body.find("table").length) {
        cy.get(".Pagination__Button--previous").should("not.exist");
        cy.get(".Pagination__Button--next")
          .should("exist")
          .click();

        cy.url().should("include", "delegates/2");

        cy.get(".Pagination__Button--previous")
          .should("exist")
          .click();

        cy.url().should("include", "delegates/1");
      }
    });
  });

  it("should be possible to click on a delegate username", () => {
    cy.get("div.max-w-2xl").then($body => {
      if ($body.find("table").length) {
        cy.get("h1")
          .contains("Delegates")
          .should("exist")
          .then($heading => {
            const heading = $heading.text();

            cy.get("tbody tr")
              .first()
              .within(() => {
                cy.get("a")
                  .first()
                  .click();
              });

            cy.get("h1").should($heading2 => {
              expect($heading2.text()).not.to.eq(heading);
            });

            cy.url().should("include", "wallets/");
          });
      }
    });
  });
});
