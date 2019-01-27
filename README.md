# Buso

## Buffered message bus

Buso is basic buffered message bus written in TypeScript. It runs in the browser, or on the server using node.js.

### Setup

```bash
yarn add buso
```

or

```bash
npm install --save buso
```

### Usage

Before you start import the library

```javascript
import Buso from 'buso'
```

#### Basic usage

```javascript
// Setup a new bus with a buffer of 2 items
const bus = new Buso()

// Data published can be anything
const data = {}
const message = 'Hi'
const number = 1

// Publish before you subscribe
bus.publish(data)

// Sometimes later
const subscriber = context => {
  console.log(context)
}

// The subscription will go over all messages in the buffer
bus.subscribe(subscriber)

// Publish after the subscription
bus.publish(message)
bus.publish(number)

// "Hi" and 1 are logged, but not {} as there is no buffer to keep data before subscriptions

// Cleanup
bus.unsubsribe(subscriber)
```

#### Buffered usage

```javascript
// Setup a new bus with a buffer of 2 items
const bus = new Buso(2)

// Data published can be anything
const data = {}
const message = 'Hi'
const number = 1

// Publish before you subscribe
bus.publish(data)
bus.publish(message)
bus.publish(number)

// Sometimes later
const subscriber = context => {
  console.log(context)
}

// The subscription will go over all messages in the buffer
bus.subscribe(subscriber)

// "Hi" and 1 are logged, but not {} as data is evacuated from the buffer as it reached the max size

// Cleanup
bus.unsubsribe(subscriber)
```

## License

[MIT](LICENSE)
