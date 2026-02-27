# OPNet - Logger

![Bitcoin](https://img.shields.io/badge/Bitcoin-000?style=for-the-badge&logo=bitcoin&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Gulp](https://img.shields.io/badge/GULP-%23CF4647.svg?style=for-the-badge&logo=gulp&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Introduction

More than your typical logger. Why not bring style to your logs? The OPNet logger library allows you to create and
style logs for your OPNet applications. Written in TypeScript!

## Getting Started

### Prerequisites

- Node.js version 16.x or higher
- npm (Node Package Manager)

### Installation

```shell
npm i @btc-vision/logger
```

#### Development

1. Clone the repository:
   ```bash
   git clone https://github.com/btc-vision/logger.git
   ```
2. Navigate to the repository directory:
   ```bash
   cd logger
   ```
3. Install the required dependencies:
   ```bash
   npm i
   ```

## Usage

Here's a basic example of how to use the OPNet Transaction Builder library to create and sign a transaction:

```typescript
import { Logger } from '@btc-vision/logger';

const logger = new Logger();

logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.debug('This is a debug message');
logger.debugBright('This is a debug message');
logger.traceLog('This is a trace message');
logger.panic('This is a panic message');
logger.securityNotice('This is a security notice message');
logger.important('This is an important message');
logger.fail('This is a fail message');
logger.success('This is a success message');

// ... or

class MyFunClass extends Logger {
    constructor() {
        super();
    }

    public myFunMethod() {
        this.info('This is an info message');
        this.warn('This is a warning message');
        this.error('This is an error message');
        this.debug('This is a debug message');
        // ...
    }
}
```

## Contribution

Contributions are welcome! Please read through the `CONTRIBUTING.md` file for guidelines on how to submit issues,
feature requests, and pull requests. We appreciate your input and encourage you to help us improve OPNet.

## License

This project is open source and available under the [MIT License](LICENSE). If you have any suggestions or
contributions, please feel free to submit a pull request.
