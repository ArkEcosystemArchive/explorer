describe("Block Details", () => {
  it("should be possible to copy the block id", () => {
    cy.visit("/block/3487084709104787070");

    cy.get(".ClipboardButton svg.block").as("btn");
    cy.get("@btn").should("not.have.class", "animate__animated");
    cy.get("@btn").click().should("not.class", "animate__animated");
  });

  // it("should be possible to navigate to next block and back", () => {
  //   cy.visit("/block/3487084709104787070");

  //   cy.get("span.has-tooltip")
  //     .contains("3487084709104787070")
  //     .should("be.visible");
  //   cy.get("button")
  //     .contains("Next block")
  //     .click();

  //   cy.get("span.has-tooltip")
  //     .contains("12152817243754268433")
  //     .should("be.visible");
  //   cy.get("button")
  //     .contains("Previous block")
  //     .click();

  //   cy.get("span.has-tooltip")
  //     .contains("3487084709104787070")
  //     .should("be.visible");
  // });

  it("should not contain a transaction table if block has no transactions", () => {
    cy.visit("/block/3487084709104787070");

    cy.get(".list-row-border-b").first().children().last().should("include.text", 0);
    cy.get("table.vgt-table").should("not.exist");
  });

  it("should refresh the confirmation count automatically", () => {
    cy.visit("/block/3487084709104787070");

    cy.get(".page-section").find(".list-row-border-b").eq(1).find("div").should("have.length", 2).last().as("count");

    cy.get("@count").then(($count) => {
      const count = $count.text();

      cy.get("@count", { timeout: 20000 }).should(($count2) => {
        expect($count2.text()).not.to.eq(count);
      });
    });
  });

  it("should be possible to click on the delegate name", () => {
    cy.visit("/block/3487084709104787070");

    cy.get(".page-section").find(".list-row").last().find("a").click();
    cy.url().should("include", "wallets/AZDc97RxUETWX3tPKEvWHWMNdrfN8CvEpR");
    cy.get("h1").should("be.visible").and("include.text", "Wallet summary");
  });

  it("should contain a transaction table if block has 1 or more transactions", () => {
    cy.visit("/block/12287662939647858585");

    cy.get(".list-row-border-b").first().children().last().should("include.text", 1);
    cy.get("table.vgt-table").should("be.visible");

    cy.get("table.vgt-table tbody tr").should("have.length", 1);
  });
});
