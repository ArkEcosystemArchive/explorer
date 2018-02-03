export interface NetworkConfig {
  activeNetwork: Network;
  availableNetworks: Network[];
}

export interface Network {
  name: string;
  displayName: string;
  node: string;
  nethash: string;
  currencies: string[];
  knownAddresses: {[address: string]: string};
  properties: NetworkProperties;
}

export interface NetworkProperties {
  disablePriceApi?: boolean;
}
