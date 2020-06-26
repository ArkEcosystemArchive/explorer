import { Factory, Model, Server } from "miragejs";

const loadFixture = (fixture) => require(`./fixtures/api/${fixture}.json`);

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    environment,

    trackRequests: true,

    models: {
      block: Model,
      delegate: Model,
      lock: Model,
      peer: Model,
      round: Model,
      transaction: Model,
      vote: Model,
      wallet: Model,
    },

    factories: {
      block: Factory.extend({}),
      delegate: Factory.extend({}),
      lock: Factory.extend({}),
      peer: Factory.extend({}),
      round: Factory.extend({}),
      transaction: Factory.extend({}),
      vote: Factory.extend({}),
      wallet: Factory.extend({}),
    },

    seeds(server) {
      server.create("block", {});
      server.create("delegate", {});
      server.create("lock", {});
      server.create("peer", {});
      server.create("round", {});
      server.create("transaction", {});
      server.create("vote", {});
      server.create("wallet", {});
    },

    routes() {
      this.get("https://min-api.cryptocompare.com/data/price?fsym=ARK&tsyms=ARK", (schema, request) => {
        return {
          ARK: 1,
        };
      });

      // ARK API
      this.urlPrefix = "https://explorer.ark.io";
      this.namespace = "api";

      this.get("/blockchain", (schema, request) => {
        return require("./fixtures/api/blockchain.json");
      });

      this.get("/blocks", (schema, request) => {
        const response = loadFixture("blocks");

        if (request.queryParams.limit) {
          response.data = response.data.slice(0, request.queryParams.limit);
        }

        return response;
      });

      this.get("/blocks/:id", (schema, request) => {
        return loadFixture(`blocks/${request.params.id}`);
      });

      this.get("/blocks/:id/transactions", (schema, request) => {
        return loadFixture(`blocks/${request.params.id}/transactions`);
      });

      this.get("/blocks/first", (schema, request) => {
        return loadFixture("blocks/first");
      });

      this.get("/blocks/last", (schema, request) => {
        return loadFixture("blocks/last");
      });

      this.post("/blocks/search", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/delegates", (schema, request) => {
        const response = loadFixture(`delegates-page-${request.queryParams.page || 1}`);

        if (request.queryParams.limit) {
          response.data = response.data.slice(0, request.queryParams.limit);
        }

        return response;
      });

      this.get("/delegates/:id", (schema, request) => {
          return loadFixture(`delegates/${request.params.id}`);
      });

      this.get("/delegates/:id/blocks", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/delegates/:id/voters", (schema, request) => {
        const response = loadFixture(`delegates/${request.params.id}/voters`);

        if (request.queryParams.limit) {
          response.data = response.data.slice(0, request.queryParams.limit);
        }

        return response;
      });

      this.post("/delegates/search", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/locks", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/locks/:id", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/locks/search", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.post("/locks/unlocked", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/node/configuration", (schema, request) => {
        return loadFixture("node/configuration");
      });

      this.get("/node/configuration/crypto", (schema, request) => {
        return loadFixture("node/configuration/crypto");
      });

      this.get("/node/fees", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/node/status", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/node/syncing", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/peers", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/peers/:ip", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/rounds/:id/delegates", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/transactions", (schema, request) => {
        let response;

        if (request.queryParams.senderId) {
          response = loadFixture(`wallets/${request.queryParams.senderId}/transactions/sent`);
        }

        if (request.queryParams.recipientId) {
          response = loadFixture(`wallets/${request.queryParams.recipientId}/transactions/received`);
        }

        response = loadFixture("transactions");

        if (request.queryParams.limit) {
          response.data = response.data.slice(0, request.queryParams.limit);
        }

        return response;
      });

      // this.post("/transactions", (schema, request) => {
      //   return {
      //     meta: {},
      //     data: [],
      //   };
      // });

      this.get("/transactions/:id", (schema, request) => {
        return loadFixture(`transactions/${request.params.id}`);
      });

      this.get("/transactions/fees", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/transactions/schemas", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.post("/transactions/search", (schema, request) => {
        const { id } = JSON.parse(request.requestBody);

        if (id === "44d9d0a3093232b9368a24af90577741df8340b93732db23b90d44f6590d3e42") {
          return loadFixture("transactions/search/44d9d0a3093232b9368a24af90577741df8340b93732db23b90d44f6590d3e42");
        }
      });

      this.get("/transactions/types", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/transactions/unconfirmed", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/transactions/unconfirmed/:id", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/votes", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/votes/:id", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/wallets", (schema, request) => {
        return {
          meta: {},
          data: [],
        };
      });

      this.get("/wallets/:id", (schema, request) => {
        return loadFixture(`wallets/${request.params.id}`);
      });

      this.get("/wallets/:id/locks", (schema, request) => {
        return loadFixture(`wallets/${request.params.id}/locks`);
      });

      this.get("/wallets/:id/transactions", (schema, request) => {
        if (request.params.senderId) {
          return loadFixture(`wallets/${request.params.senderId}/transactions/sent`);
        }

        if (request.params.recipientId) {
          return loadFixture(`wallets/${request.params.recipientId}/transactions/received`);
        }

        return loadFixture(`wallets/${request.params.id}/transactions`);
      });

      this.get("/wallets/:id/transactions/received", (schema, request) => {
        return loadFixture(`wallets/${request.params.id}/transactions/received`);
      });

      this.get("/wallets/:id/transactions/sent", (schema, request) => {
        return loadFixture(`wallets/${request.params.id}/transactions/sent`);
      });

      this.get("/wallets/:id/votes", (schema, request) => {
        return loadFixture(`wallets/${request.params.id}/votes`);
      });

      this.post("/wallets/search", (schema, request) => {
        return loadFixture("wallets/search");
      });

      this.get("/wallets/top", (schema, request) => {
        const response = loadFixture("wallets/top");

        if (request.queryParams.limit) {
          response.data = response.data.slice(0, request.queryParams.limit);
        }

        return response;
      });

      // ARK Magistrate
      this.get("/businesses", (schema, request) => {
        const response = loadFixture("businesses");

        if (request.queryParams.limit) {
          response.data = response.data.slice(0, request.queryParams.limit);
        }

        return response;
      });

      this.get("/bridgechains", (schema, request) => {
        const response = loadFixture("bridgechains");

        if (request.queryParams.limit) {
          response.data = response.data.slice(0, request.queryParams.limit);
        }

        return response;
      });
    },
  });
}
