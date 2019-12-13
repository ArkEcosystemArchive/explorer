# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project follows the major and minor version releases of [Core](https://github.com/ArkEcosystem/core). This will change to proper [Semantic Versioning](http://semver.org/spec/v2.0.0.html) after the release of Core 3.0.

## Unreleased

### Added

- feat: delegate pagination [#792]
- feat: show registered businesses [#778]
- feat: bignumber arithmetic [#777]
- feat: add tab for resigned delegates [#772]
- feat: support for core 2.6 transactions [#760]
- feat: add basic ARK crypto utilities
- feat: detect if delegate became active this round [#737]

### Changed

- feat: wrap locked balances [#796]
- chore: collect coverage from vue files [#793]
- feat: add blur to app when modal is open [#784]
- refactor: number formatting and tooltip placement [#758]
- refactor: migrate remaining components to typescript [#754]
- refactor: replace img with SvgIcon [#753]
- chore(deps): add renovate.js [#743]
- ci: trigger workflows for push.* and pull_request.* events [#741]
- ci: setup github action workflow for testing [#740]

### Fixed

- fix: check that sender is requested address [#791]
- feat: add check for businesses / bridgechains being enabled [#789]
- fix: build sum over payments to same address [#781]
- fix: various & i18n of magistrate asset properties [#785]
- ci: switch to codecov-action [#782]
- fix: use typeGroups in addition to type [#773]
- fix: dynamic margins of pagination buttons [#762]
- fix: hide marketcup when no currency [#653]

## Previous versions

See [GitHub releases](../releases).