describe("Transactions", () => {
  beforeEach(() => {
    cy.visit("/transactions/1");
  });

  it("should show 25 rows in the table", () => {
    cy.get("table.vgt-table tbody tr").should("have.length", 25);
  });

  it("should be possible to sort the table", () => {
    cy.get("th")
      .first()
      .as("id")
      .should("exist");
    cy.get("@id")
      .should("contain.text", "ID");

    cy.get("@id").should("not.have.class", "sorting-asc");
    cy.get("@id").should("not.have.class", "sorting-desc");

    cy.get("@id").click();
    cy.get("@id").should("have.class", "sorting-asc");

    cy.get("@id").click();
    cy.get("@id").should("have.class", "sorting-desc");
  });

  it("should be possible to navigate to the next page and back", () => {
    cy.get(".Pagination__Button--previous").should("not.exist");
    cy.get(".Pagination__Button--next")
      .should("exist")
      .click();

    cy.url().should("include", "transactions/2");

    cy.get(".Pagination__Button--previous")
      .should("exist")
      .click();

    cy.url().should("include", "transactions/1");
  });

  it("should be possible to click on the transaction id", () => {
    cy.get("h1")
      .contains("Transactions")
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

        cy.url().should("include", "transaction/");
      });
  });

  it("should be possible to click on the sender", () => {
    cy.get("h1")
      .contains("Transactions")
      .should("exist")
      .then($heading => {
        const heading = $heading.text();

        cy.get("tbody tr")
          .first()
          .within(() => {
            cy.get("td")
              .eq(2)
              .within(() => {
                cy.get("a")
                  .first()
                  .click();
              });
          });

        cy.get("h1").should($heading2 => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "wallets/");
      });
  });

  it("should be possible to click on the recipient if it contains a link", () => {
    cy.get("h1")
      .contains("Transactions")
      .should("exist")
      .then($heading => {
        const heading = $heading.text();

        cy.get("tbody tr")
          .first()
          .then($row => {
            cy.wrap($row)
              .get("td")
              .eq(3)
              .then($cell => {
                return $cell.find("a").length ? $cell.find("a") : null;
              })
              .then(link => {
                if (link) {
                  cy.wrap(link).click();

                  cy.get("h1").should(
                    $heading2 => {
                      expect($heading2.text()).not.to.eq(heading);
                    },
                    { timeout: 20000 },
                  );

                  cy.url().should("include", "wallets/");
                }
              });
          });
      });
  });

  it("should contain a dropdown allowing to filter transactions types", () => {
    cy.get(".bg-theme-feature-background").within(() => {
      cy.get("span")
        .last()
        .contains("All")
        .click();
      cy.get(".hidden.sm\\:block .dropdown-button")
        .contains("Vote")
        .click();
      cy.get("span")
        .last()
        .should("contain.text", "Vote");
    });
  });
});
