describe("Bridgechains", () => {
  it("should show a disclaimer", () => {
    cy.visit("/bridgechains/1");

    cy.get("div.modal-container").should("be.visible");
  });

  it("should be possible to dismiss the disclaimer", () => {
    cy.visit("/bridgechains/1");

    cy.get("div.modal-container button")
      .contains("Accept")
      .click();

    cy.get("div.modal-container").should("not.be.visible");
  });

  it("should show up to 25 rows in the table", () => {
    cy.get("table.vgt-table tbody tr").should("have.length.of.at.most", 25);
  });

  it("should be possible to sort the table", () => {
    cy.get("div.max-w-2xl").then($body => {
      if ($body.find("table").length) {
        cy.get("th")
          .eq(1)
          .as("creator")
          .should("exist");
        cy.get("@creator")
          .should("contain.text", "Creator");

        cy.get("@creator").should("not.have.class", "sorting-asc");
        cy.get("@creator").should("not.have.class", "sorting-desc");

        cy.get("@creator").click();
        cy.get("@creator").should("have.class", "sorting-asc");

        cy.get("@creator").click();
        cy.get("@creator").should("have.class", "sorting-desc");
      }
    });
  });

  xit("should be possible to navigate to the next page and back", () => {
    // TODO: enable once we have more bridgechains
    cy.get("div.max-w-2xl").then($body => {
      if ($body.find("table").length) {
        cy.get(".Pagination__Button--previous").should("not.exist");
        cy.get(".Pagination__Button--next")
          .should("exist")
          .click();

        cy.url().should("include", "bridgechains/2");

        cy.get(".Pagination__Button--previous")
          .should("exist")
          .click();

        cy.url().should("include", "bridgechains/1");
      }
    });
  });

  xit("should be possible to click on a creator address", () => {
    // TODO: enable once we have bridgechains registered
    cy.get("div.max-w-2xl").then($body => {
      if ($body.find("table").length) {
        cy.get("h1")
          .contains("Bridgechains")
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
