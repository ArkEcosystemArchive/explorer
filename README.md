# Ark Explorer 3.0

<p align="center">
    <img src="/ARKExplorer.png" />
</p>

> Designed and developed from the ground-up, using lean & fast developmental frameworks (Tailwind CSS & Vue.JS).

[![Build Status](https://badgen.now.sh/github/status/ArkEcosystem/Explorer/develop)](https://github.com/ArkEcosystem/explorer/actions?query=branch%3Adevelop)
[![Codecov](https://badgen.now.sh/codecov/c/github/arkecosystem/explorer)](https://codecov.io/gh/arkecosystem/explorer)
[![License: MIT](https://badgen.now.sh/badge/license/MIT/green)](https://opensource.org/licenses/MIT)

> Lead Maintainer: [Michel Kraaijeveld](https://github.com/ItsANameToo)

You can access it at [https://explorer.ark.io/](https://explorer.ark.io/).

## Build Setup

### 1. Clone the repository

```bash
git clone https://github.com/ArkEcosystem/explorer
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Build for Production

#### 3.1 Mainnet

```bash
yarn build:mainnet
```

#### 3.2 Devnet

```bash
yarn build:devnet
```

#### 3.3 Custom

```bash
yarn build --network my-custom-network
```

#### 3.4 GitHub Pages

If you are going to host your explorer instance on GitHub Pages you will need to specify your base url in most cases as GitHub Pages serves repositories from sub-directories instead of sub-domains.

```bash
yarn build --base https://username.github.io/repository/
```

A running instance of the explorer on GitHub Pages can be found at https://arkecosystem.github.io/.

> This step is not required if you are hosting the explorer on your "root" repository which is usually your username https://username.github.io/.

#### 3.5 Run Express Server

You can run the explorer as an express server. This makes it a little more light-weight but not needing to have services such as apache or nginx.

```bash
EXPLORER_HOST="127.0.0.1" EXPLORER_PORT="4200" node express-server.js
```

> Keep in mind that this requires you to run your own server and a running instance of nginx.

### 4. Development

#### 4.1 Mainnet

```bash
yarn serve # or yarn serve:mainnet
```

#### 4.2 Devnet

```bash
yarn serve:devnet
```

#### 4.3 Custom

```bash
yarn serve --env.network=custom
```

### 5. History Mode

If you wish to remove the `/#/` from your URLs you can follow those steps https://router.vuejs.org/en/essentials/history-mode.html.

#### 5.1 Build

```bash
yarn build:mainnet --history
```

#### 5.2 Development

```bash
yarn serve --env.routerMode=history
```

## Testing

```bash
$ yarn test
```

## Contributing

- If you find any bugs, submit an [issue](../../issues) or open a [pull-request](../../pulls), helping us catch and fix them.
- Engage with other users and developers on the [ArkEcosystem Slack](https://ark.io/slack/).
- Join our [gitter](https://gitter.im/ark-developers/Lobby).
- [Contribute bounties](https://github.com/ArkEcosystem/bounty-program).

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
