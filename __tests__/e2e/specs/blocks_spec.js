describe("Blocks", () => {
  beforeEach(() => {
    cy.visit("/blocks/1");
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

    cy.url().should("include", "blocks/2");

    cy.get(".Pagination__Button--previous")
      .should("exist")
      .click();

    cy.url().should("include", "blocks/1");
  });

  it("should be possible to click on the block id", () => {
    cy.get("h1")
      .contains("Blocks")
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

        cy.url().should("include", "block/");
      });
  });

  it("should be possible to click on the block generator", () => {
    cy.get("h1")
      .contains("Block")
      .should("exist")
      .then($heading => {
        const heading = $heading.text();

        cy.get("tbody tr")
          .first()
          .within(() => {
            cy.get("a")
              .last()
              .click();
          });

        cy.get("h1").should($heading2 => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "wallets/");
      });
  });
});
