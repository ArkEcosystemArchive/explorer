describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should contain expected components", () => {
    cy.get(".bg-stat-background").first().children().as("fields").should("have.length", 4);

    cy.get("@fields").eq(0).should("contain.text", "Height");
    cy.get("@fields").eq(1).should("contain.text", "Network");
    cy.get("@fields").eq(2).should("contain.text", "Supply");
    cy.get("@fields").eq(3).should("contain.text", "Market Cap");

    cy.get("#line-chart").should("be.visible");
    cy.get(".active-tab").contains("Latest transactions").should("be.visible");
    cy.get(".inactive-tab").contains("Latest blocks").should("be.visible");
  });

  it("should contain a dropdown allowing to filter transactions types", () => {
    cy.get(".SelectionType")
      .children()
      .last()
      .within(() => {
        cy.get("span").contains("All").click();
        cy.get(".dropdown-button").contains("Vote").click();
        cy.get("span").eq(1).should("contain.text", "Vote");
      });
  });

  it("should be possible to switch to latest blocks", () => {
    cy.get("div").contains("Latest blocks").click();
    cy.get(".active-tab").should("include.text", "Latest blocks");
    cy.get(".inactive-tab").should("include.text", "Latest transactions");
  });

  it("latest block table should refresh automatically", () => {
    cy.get(".inactive-tab").contains("Latest blocks").click();

    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("td").first().as("cell");
      });

    cy.get("@cell").then(($cell) => {
      const id = $cell.text();

      cy.get("@cell", { timeout: 20000 }).should(($cell2) => {
        expect($cell2.text()).not.to.eq(id);
      });
    });
  });

  describe("Header", () => {
    it("should show the explorer settings", () => {
      cy.get("div.text-settings-icon").first().should("be.visible").click();

      cy.get("div.modal-container").should("be.visible");
    });
  });

  describe("Footer", () => {
    it("should contain links", () => {
      cy.get("footer > div.text-center").should("have.length.greaterThan", 0);
    });
  });

  describe("Chart", () => {
    it("should be possible to persistently change type", () => {
      cy.get("button.chart-tab").contains("Price").should("have.class", "chart-tab-active");

      cy.get(".PriceChart").within(() => {
        cy.get("button.chart-tab-active").contains("Price").click();
        cy.get(".dropdown-button").contains("Volume").click();
        cy.get("button.chart-tab-active").first().should("contain.text", "Volume");
      });

      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get("button.button-lg").click();

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });
      });

      cy.get("a.logo-container").click();
      cy.get("#line-chart").should("be.visible");

      cy.get("button.chart-tab-active").first().should("contain.text", "Volume");
    });

    it("should contain buttons for the period", () => {
      const buttons = ["Day", "Week", "Month", "Quarter", "Year"];

      cy.get(".PriceChart__PeriodButtons").within(() => {
        cy.get("button.chart-tab")
          .each(($btn, index, $btns) => {
            cy.wrap($btn).should("be.visible").should("contain.text", buttons[index]);
          })
          .then(($btns) => {
            cy.wrap($btns).should("have.length", buttons.length);
          });
      });
    });

    it("should be possible to change period", () => {
      cy.get("button.chart-tab").contains("Day").should("have.class", "chart-tab-active");

      cy.get("button.chart-tab").contains("Week").click();

      cy.get("button.chart-tab").contains("Day").should("not.have.class", "chart-tab-active");
      cy.get("button.chart-tab").contains("Week").should("have.class", "chart-tab-active");
    });

    it("should still display the selected period after changing pages", () => {
      cy.get("button.chart-tab").contains("Year").click();

      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get("button.button-lg").click();

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });
      });

      cy.get("a.logo-container").click();
      cy.get("#line-chart").should("be.visible");

      cy.get("button.chart-tab-active").should("contain.text", "Year");
    });
  });

  describe("Menu", () => {
    it("should be possible to be opened and closed", () => {
      cy.get("button").contains("Menu").first().click();

      cy.get(".HeaderMenuDesktop").should("be.visible").as("menu");

      cy.get("@menu")
        .find(".menu-button")
        .should(($items) => {
          expect($items).to.have.length.within(3, 5);
          expect($items[0]).to.contain.text("Home");
          expect($items[1]).to.contain.text("Top Wallets");
          expect($items[2]).to.contain.text("Delegate Monitor");
          if ($items.length === 6) {
            expect($items[3]).to.contain.text("Bridgechains");
            expect($items[4]).to.contain.text("Businesses");
            expect($items[5]).to.contain.text("Advanced Search");
          }
        });

      cy.get("@menu").find("button").first().click();
      cy.get(".HeaderMenuDesktop").should("not.exist");
    });

    it("should be possible to navigate to other pages and back", () => {
      const pages = ["Top Wallets", "Delegate Monitor"];

      pages.forEach((page) => {
        cy.get("h1").then(($heading) => {
          const heading = $heading.text();

          cy.get("button").contains("Menu").click();
          cy.get(".HeaderMenuDesktop button").contains(page).click();

          cy.get("h1").should(($heading2) => {
            expect($heading2.text()).not.to.eq(heading);
          });
        });

        cy.url().should("include", page.replace(" ", "-").toLowerCase());

        cy.get("h1").then(($heading) => {
          const heading = $heading.text();

          cy.get("button").contains("Menu").click();
          cy.get(".HeaderMenuDesktop button").contains("Home").click();

          cy.get("h1").should(($heading2) => {
            expect($heading2.text()).not.to.eq(heading);
          });
        });

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      });
    });
  });

  describe("Search", () => {
    it("should be possible to search for a known wallet", () => {
      cy.wait(2000); // To ensure known wallets are fetched beforehand

      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get(".HeaderDefault .search-input").first().click();
        cy.get(".HeaderSearch .search-input").first().type("Genesis Wallet{enter}");

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "/wallets/AewxfHQobSc49a4radHp74JZCGP8LRe4xA");
      });
    });

    it("should be possible to search for a delegate", () => {
      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get(".HeaderDefault .search-input").first().click();
        cy.get(".HeaderSearch .search-input").first().type("genesis_1{enter}");

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "/wallets/AeLpRK8rFVtBeyBVqBtdQpWDfLzaiNujKr");
      });
    });

    it("should be possible to search for a delegate with uppercase letters", () => {
      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get(".HeaderDefault .search-input").first().click();
        cy.get(".HeaderSearch .search-input").first().type("gEnESis_1{enter}");

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "/wallets/AeLpRK8rFVtBeyBVqBtdQpWDfLzaiNujKr");
      });
    });

    it("should be possible to search for an address", () => {
      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get(".HeaderDefault .search-input").first().click();
        cy.get(".HeaderSearch .search-input").first().type("AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv{enter}");

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "/wallets/AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv");
      });
    });

    it("should be possible to search for a block id", () => {
      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get(".HeaderDefault .search-input").first().click();
        cy.get(".HeaderSearch .search-input").first().type("13507259488170268466{enter}");

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "/block/13507259488170268466");
      });
    });

    it("should be possible to search for a transaction id", () => {
      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get(".HeaderDefault .search-input").first().click();
        cy.get(".HeaderSearch .search-input")
          .first()
          .type("4a169d00de2029110829fad77eebf6fd25751418b47561f05b994750acbd3b13{enter}");

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).not.to.eq(heading);
        });

        cy.url().should("include", "/transaction/4a169d00de2029110829fad77eebf6fd25751418b47561f05b994750acbd3b13");
      });
    });

    it("should show a notice if nothing could be found", () => {
      cy.get("h1").then(($heading) => {
        const heading = $heading.text();

        cy.get(".HeaderDefault .search-input").first().click();
        cy.get(".HeaderSearch .search-input").first().type("asdfnothingfoundforthisvalueasdf{enter}");

        cy.get("h1").should(($heading2) => {
          expect($heading2.text()).to.eq(heading);
        });

        cy.get("div.tooltip-inner").should("contain.text", "Nothing matched your search");
      });
    });
  });
});
