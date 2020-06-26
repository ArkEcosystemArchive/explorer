describe("Voters", () => {
  it("should show 25 rows in the table", () => {
    cy.visit("/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1");

    cy.get("table.vgt-table tbody tr").should("have.length", 25);
  });

  it("should be possible to sort the table", () => {
    cy.visit("/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1");

    cy.get("th")
      .eq(1)
      .as("address")
      .should("exist");
    cy.get("@address")
      .should("contain.text", "Address");

    cy.get("@address").should("not.have.class", "sorting-asc");
    cy.get("@address").should("not.have.class", "sorting-desc");

    cy.get("@address").click();
    cy.get("@address").should("have.class", "sorting-asc");

    cy.get("@address").click();
    cy.get("@address").should("have.class", "sorting-desc");
  });

  it("should be possible to navigate to the next page and back", () => {
    cy.visit("/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1");

    cy.get(".Pagination__Button--previous").should("not.exist");
    cy.get(".Pagination__Button--next")
      .should("exist")
      .click();

    cy.url().should("include", "voters/2");

    cy.get(".Pagination__Button--previous")
      .should("exist")
      .click();

    cy.url().should("include", "voters/1");
  });

  it("should display the delegates name", () => {
    cy.visit("/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1");

    cy.get("h1 span")
      .should("contain.text", "arkpool");
  });

  it("should be possible to click on a wallet address", () => {
    cy.visit("/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1");

    cy.get("h1")
      .contains("Voters")
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
  });

  it("should redirect to 404 if the wallet address is invalid", () => {
    cy.visit("/wallets/ffffffffffffffffffffffffffffffffff/voters/1");
    cy.get("h1")
      .should("contain.text", "Ooops!");
    cy.url().should("include", "/404");
  });
});
