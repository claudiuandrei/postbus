# Postbus

## Buffered message bus

Postbus is basic buffered message bus written in TypeScript. It runs in the browser, or on the server using node.js.

### Setup

```bash
yarn add postbus
```

or

```bash
npm install --save postbus
```

### Usage

Before you start import the library

```javascript
import Postbus from 'postbus'
```

#### Basic usage

```javascript
// Setup a new bus with no buffer
const bus = new Postbus()

// Data published can be anything
const data = {}
const message = 'Hi'
const number = 1

// Setup a subscriber
bus.subscribe(context => {
  console.log(context)
})

// Publish some data
bus.publish(data)
bus.publish(message)
bus.publish(number)

// Cleanup
bus.unsubsribe(subscriber)
```

#### Buffered usage

```javascript
// Setup a new bus with a buffer of 2 items
const bus = new Postbus(2)

// Data published can be anything
const data = {}
const message = 'Hi'

// Publish before you subscribe
bus.publish(data)
bus.publish(message)

// Because this will exceed the buffer size, it will push the first item out
bus.publish(number)

// The subscription will go over all messages in the buffer
bus.subscribe(context => {
  console.log(context)
})

// You can still pusblish here too, and the previous subscriber will catch it all
bus.publish(data)

// Cleanup
bus.unsubsribe(subscriber)
```

## License

[MIT](LICENSE)
