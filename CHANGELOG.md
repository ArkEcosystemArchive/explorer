# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project follows the major and minor version releases of [Core](https://github.com/ArkEcosystem/core). This will change to proper [Semantic Versioning](http://semver.org/spec/v2.0.0.html) after the release of Core 3.0.

## [2.6.0] - 2020-11-02

### Added

- feat: advanced search ([#804](https://github.com/ArkEcosystem/explorer/issues/804)
- feat: add changelog ([#797](https://github.com/ArkEcosystem/explorer/issues/797))
- feat: delegate pagination ([#792](https://github.com/ArkEcosystem/explorer/issues/792))
- feat: show registered businesses ([#778](https://github.com/ArkEcosystem/explorer/issues/778))
- feat: bignumber arithmetic ([#777](https://github.com/ArkEcosystem/explorer/issues/777))
- feat: add tab for resigned delegates ([#772](https://github.com/ArkEcosystem/explorer/issues/772))
- feat: support for core 2.6 transactions ([#760](https://github.com/ArkEcosystem/explorer/issues/760))
- feat: add basic ARK crypto utilities
- feat: detect if delegate became active this round ([#737](https://github.com/ArkEcosystem/explorer/issues/737))

### Changed

- refactor: show timelock status as expired for expired locks ([#860](https://github.com/ArkEcosystem/explorer/issues/860))
- refactor: fetch all active delegates if count bigger than api limit ([#851](https://github.com/ArkEcosystem/explorer/issues/851))
- refactor: check if token is listed on crypto compare before fetching prices ([#849](https://github.com/ArkEcosystem/explorer/issues/849))
- chore: replace circleci bade with gh actions bade ([#844](https://github.com/ArkEcosystem/explorer/issues/844))
- refactor: calculate total forged based on initial supply ([#841](https://github.com/ArkEcosystem/explorer/issues/841))
- refactor: get htlcEnabled from config ([#836](https://github.com/ArkEcosystem/explorer/issues/836))
- refactor: transaction recipient ([#822](https://github.com/ArkEcosystem/explorer/issues/822))
- refactor: make menu components dry ([#814](https://github.com/ArkEcosystem/explorer/issues/814))
- feat: wrap locked balances ([#796](https://github.com/ArkEcosystem/explorer/issues/796))
- chore: collect coverage from vue files ([#793](https://github.com/ArkEcosystem/explorer/issues/793))
- feat: add blur to app when modal is open ([#784](https://github.com/ArkEcosystem/explorer/issues/784))
- refactor: number formatting and tooltip placement ([#758](https://github.com/ArkEcosystem/explorer/issues/758))
- refactor: migrate remaining components to typescript ([#754](https://github.com/ArkEcosystem/explorer/issues/754))
- refactor: replace img with SvgIcon ([#753](https://github.com/ArkEcosystem/explorer/issues/753))
- chore(deps): add renovate.js ([#743](https://github.com/ArkEcosystem/explorer/issues/743))
- ci: trigger workflows for push._ and pull_request._ events ([#741](https://github.com/ArkEcosystem/explorer/issues/741))
- ci: setup github action workflow for testing ([#740](https://github.com/ArkEcosystem/explorer/issues/740))
- various dependency updates

### Fixed

- chore: add node_modules caching ([#864](https://github.com/ArkEcosystem/explorer/issues/864))
- chore: remove lint-staged in favour of github actions ([#863](https://github.com/ArkEcosystem/explorer/issues/863))
- fix: sort by rank order on delegates table ([#862](https://github.com/ArkEcosystem/explorer/issues/862))
- fix: set hideGeneratedBy prop on correct component and improve format workflow ([#859](https://github.com/ArkEcosystem/explorer/issues/859))
- fix: various UI tweaks ([#858](https://github.com/ArkEcosystem/explorer/issues/858))
- fix: properly remove search params when input field gets cleared ([#857](https://github.com/ArkEcosystem/explorer/issues/857))
- fix: display details for legacy multi signature transactions ([#856](https://github.com/ArkEcosystem/explorer/issues/856))
- fix: keep tooltip attribute selector classes ([#848](https://github.com/ArkEcosystem/explorer/issues/848))
- fix: tailwind fontSize config ([#840](https://github.com/ArkEcosystem/explorer/issues/840))
- fix: set enabled transaction types ([#839](https://github.com/ArkEcosystem/explorer/issues/839))
- fix: cypress verify failure ([#835](https://github.com/ArkEcosystem/explorer/issues/835))
- fix: default to address link ([#833](https://github.com/ArkEcosystem/explorer/issues/833))
- fix: unicode representation ([#819](https://github.com/ArkEcosystem/explorer/issues/819))
- fix: base show-more condition on meta object ([#812](https://github.com/ArkEcosystem/explorer/issues/812))
- fix: check that sender is requested address ([#791](https://github.com/ArkEcosystem/explorer/issues/791))
- feat: add check for businesses / bridgechains being enabled ([#789](https://github.com/ArkEcosystem/explorer/issues/789))
- fix: build sum over payments to same address ([#781](https://github.com/ArkEcosystem/explorer/issues/781))
- fix: various & i18n of magistrate asset properties ([#785](https://github.com/ArkEcosystem/explorer/issues/785))
- ci: switch to codecov-action ([#782](https://github.com/ArkEcosystem/explorer/issues/782))
- fix: use typeGroups in addition to type ([#773](https://github.com/ArkEcosystem/explorer/issues/773))
- fix: dynamic margins of pagination buttons ([#762](https://github.com/ArkEcosystem/explorer/issues/762))
- fix: hide marketcup when no currency ([#653](https://github.com/ArkEcosystem/explorer/issues/653))

## Previous versions

See [GitHub releases](https://github.com/ArkEcosystem/explorer/releases).
