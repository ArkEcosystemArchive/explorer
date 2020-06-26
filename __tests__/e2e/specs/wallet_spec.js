describe("Wallet", () => {
  it("should be possible to copy the wallet address", () => {
    cy.visit("wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs");

    cy.get(".ClipboardButton svg.block").first().as("btn");
    cy.get("@btn").should("not.have.class", "animate__animated");
    cy.get("@btn").click().should("have.class", "animate__animated");
  });

  it("should show the wallet's balance", () => {
    cy.visit("wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs");

    cy.get(".WalletHeaderDesktop").within(() => {
      cy.get("div").contains("Balance").should("be.visible");
      cy.get("div").contains("Balance").siblings().first().should("be.visible");
    });
  });

  it("should contain transaction tabs and transaction count", () => {
    cy.visit("wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs");

    cy.get(".WalletTransactions").within(() => {
      cy.get("div").contains("All").should("exist");

      cy.get("div").contains("Sent").should("exist");
      cy.get("div").contains("Sent").find("span").should("exist");

      cy.get("div").contains("Received").should("exist");
      cy.get("div").contains("Received").find("span").should("exist");
    });
  });

  it("should be possible to switch to other transaction types", () => {
    cy.visit("wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs");

    cy.get(".TransactionsNavigation").within(() => {
      cy.get(".TransactionsNavigation--tab").contains("Sent").click();
      cy.get(".TransactionsNavigation--tab").contains("Sent").should("have.class", "active");
      cy.get(".TransactionsNavigation--tab").contains("All").should("not.have.class", "active");
    });
  });

  it("should show a list of transactions, including show more button", () => {
    cy.visit("wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs");

    cy.get("table.vgt-table").should("exist").and("be.visible");
    cy.get("table.vgt-table tbody tr").should("have.length", 25);
    cy.get("button.button-lg").should("exist").and("be.visible");
  });

  it("should be possible to click on the show more button and switch transaction type", () => {
    cy.visit("wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs");

    cy.get("button.button-lg", { timeout: 20000 }).click();
    cy.url().should("include", "wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs/transactions/all/2");

    cy.get(".bg-theme-feature-background").within(() => {
      cy.get("span").last().contains("All").click();
      cy.get(".dropdown-button").contains("Received").click();
      cy.get("span").last().should("contain.text", "Received");
    });

    cy.url().should("include", "wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs/transactions/received/1");
  });

  it("should be possible to toggle the QR code", () => {
    cy.visit("wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs");

    cy.get("div.modal-container").should("not.exist");

    cy.get("button.address-button").click();
    cy.get("div.modal-container").should("exist").and("be.visible");

    cy.get("button.absolute.top-0").click();
    cy.get("div.modal-container").should("not.exist");
  });

  it("should show who the wallet voted for", () => {
    cy.visit("wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ");

    cy.get(".WalletVote div").contains("Voting for").should("exist").and("be.visible");
    cy.get(".WalletVote div").contains("Voting for").siblings().last().find("a").should("exist");
  });

  it("should not show the container if the wallet is not voting", () => {
    cy.visit("wallets/AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv");

    cy.get(".WalletVote").should("not.exist");
  });

  it("should show delegate information", () => {
    cy.visit("wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ");

    cy.get(".WalletDelegate").within(() => {
      cy.get(".list-row-border-b").contains("Username").should("exist");
      cy.get(".list-row-border-b").contains("Rank").should("exist");
      cy.get(".list-row-border-b").contains("Votes").should("exist");
      cy.get(".list-row-border-b").contains("Total forged").should("exist");
      cy.get(".list-row").contains("Forged blocks").should("exist");
      cy.get(".list-row-border-t").contains("Voters").should("exist");
    });
  });

  it("should be possible to navigate to the list of forged blocks", () => {
    cy.visit("wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ");

    cy.get("h1")
      .contains("Wallet summary")
      .should("exist")
      .then(($heading) => {
        const heading = $heading.text();

        cy.get(".WalletDelegate .list-row").find("a").contains("See all").click();

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
          expect($heading2.text()).to.include("Blocks");
        });

        cy.url().should("include", "/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/blocks/1");
      });
  });

  it("should be possible to navigate to the list of voters", () => {
    cy.visit("wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ");

    cy.get("h1")
      .contains("Wallet summary")
      .should("exist")
      .then(($heading) => {
        const heading = $heading.text();

        cy.get(".WalletDelegate .list-row-border-t").find("a").contains("See all").click();

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
          expect($heading2.text()).to.include("Voters");
        });

        cy.url().should("include", "/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1");
      });
  });

  it("should redirect to 404 if the wallet address is invalid", () => {
    cy.visit("/wallets/ffffffffffffffffffffffffffffffffff");

    cy.get("h1").should("contain.text", "Ooops!");
    cy.url().should("include", "/404");
  });
});
