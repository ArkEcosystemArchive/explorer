<p align="center">
    <img src="https://i.imgur.com/JpkIhYH.png" />
</p>

[![Build Status](https://img.shields.io/travis/ArkEcosystem/ark-explorer/master.svg?style=flat)](https://travis-ci.org/ArkEcosystem/ark-explorer)

# ARK Explorer 3.0

> Designed and developed from the ground-up, using lean & fast developmental frameworks (Tailwind CSS & Vue.JS).

You can access it at [https://explorer.ark.io/](https://explorer.ark.io/).

## Build Setup

### 1. Clone the repository

```bash
git clone https://github.com/ArkEcosystem/ark-explorer
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

> This step is not required if you are hosting the explorer on your "root" repository which is usually your username https://username.github.io/.

## History Mode

If you wish to remove the `/#/` from your URLs you can follow those steps https://router.vuejs.org/en/essentials/history-mode.html.

> Keep in mind that this requires you to run your own server and a running instance of nginx.

## Development

```bash
yarn dev
```

## Testing

``` bash
$ yarn test
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Credits

- [Brian Faust](https://github.com/faustbrian)
- [Lúcio Rubens](https://github.com/luciorubeens)
- [Alex Barnsley](https://github.com/alexbarnsley)
- [All Contributors](../../contributors)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
