# veyer-wellness

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
TODO: Put more badges here.

veyer-wellness login system

TODO: Fill out this long description.

## Table of Contents

- [Security](#security)
- [Background](#background)
- [Download](#download)
- [Deploy ](#deploy)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Security

## Background

## Download 

Download from gitHub:
```
$ git clone https://github.com/Qinchengqiang/veyor-wellness.git booking-app
```

## Deploy 

step 1: if don't install json-server and serve globally, please do it by:
```
$ npm install -g serve
$ npm install -g json-server
```

step 2: setting mock (go to mock directory /booking-app/mock)
```
$ cd booking-app/mock 
$ npm install
$ json-server --watch src/db.json --port 3005
```
now the mock API at http://localhost:3005


step 3: build and run app (at root directory /booking-app)
```
$ cd booking-app
$ yarn 
$ yarn build
$ serve -s build
```
now open http://localhost:5000, and you can use app to book.

run unit test (at root directory /booking-app)
```
$ cd booking-app
$ yarn test
```

## API

Resources

http://localhost:3005/appointments

http://localhost:3005/booking

Home

http://localhost:3005

## Maintainers

[@Steven Qin](https://github.com/Qinchengqiang)

## Contributing

See [the contributing file](contributing.md)!

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2021 Steven Qin
