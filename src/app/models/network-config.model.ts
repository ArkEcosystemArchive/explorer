export interface NetworkConfig {
  activeNetwork: Network;
  availableNetworks: Network[];
}

export interface Network {
  name: string;
  node: string;
  nethash: string;
  currencies: string[];
  knownAddresses: {[address: string]: string};
  properties: NetworkProperties;
}

export interface NetworkProperties {
  disablePriceApi?: boolean;
}
