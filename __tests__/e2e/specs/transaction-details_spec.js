describe("Transaction Details", () => {
  beforeEach(() => {
    cy.visit("/transaction/80aa5f3c1520481c26ab606b9e15fae1c3424dbabbce3719fc8f381e8bb19d29");
  });

  it("should be possible to copy the transaction id", () => {
    cy.get(".ClipboardButton svg.block").as("btn");
    cy.get("@btn").should("not.have.class", "animate__animated");
    cy.get("@btn").click().should("not.class", "animate__animated");
  });

  it("should be possible to click on the sender", () => {
    cy.get(".page-section").find(".list-row-border-b").first().find("a").click();
    cy.url().should("include", "wallets/AHKtfzCDBmgmPGw5XntZdiTRHEkQ8fRWvL");
    cy.get("h1").should("be.visible").and("include.text", "Wallet summary");
  });

  it("should be possible to click on the recipient", () => {
    cy.get(".page-section").find(".list-row-border-b").eq(1).find("a").click();
    cy.url().should("include", "wallets/AMDYg9KnpCUL8voMTGpsGgUrrFrdA3uDPx");
    cy.get("h1").should("be.visible").and("include.text", "Wallet summary");
  });

  it("should be possible to see the transaction type", () => {
    cy.get(".page-section").find(".list-row-border-b").eq(2).should("include.text", "Transfer");
  });

  it("should be possible to click on the block id", () => {
    cy.get(".page-section").find(".list-row").find("a").first().click();
    cy.url().should("include", "block/5006070805189645310");
    cy.get("h1").should("be.visible").and("include.text", "Block");
  });

  it("should emojify the vendor field", () => {
    cy.get(".page-section").find(".list-row-border-b-no-wrap").eq(1).should("include.text", "ARK ❤️ you");
  });

  it("should refresh the confirmation count automatically", () => {
    cy.get(".page-section").find(".list-row-border-b").eq(3).find("div").should("have.length", 2).last().as("count");

    cy.get("@count").then(($count) => {
      const count = $count.text();

      cy.get("@count", { timeout: 30000 }).should(($count2) => {
        expect($count2.text()).not.to.eq(count);
      });
    });
  });
});
