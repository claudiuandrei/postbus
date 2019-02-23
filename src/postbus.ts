// Setup the handler
type Handler = (context: any) => void

// Buffered bus
class Postbus {
  // Handlers
  private handlers: Set<Handler> = new Set()

  // Buffer
  private buffer: Array<any> = []
  private bufferSize: number

  // Setup a buffer
  constructor(bufferSize: number = 0) {
    // Set the buffer size
    this.bufferSize = bufferSize
  }

  // Publish data
  publish(context: any): void {
    // Send the data to all handlers
    this.handlers.forEach((handler: Handler) => {
      handler(context)
    })

    // Buffer the data when we have a buffered bus
    if (this.bufferSize > 0) {
      // Push the data at the end of the buffer
      this.buffer.push(context)

      // Remove the oldest data if we exceed the buffer size
      if (this.buffer.length > this.bufferSize) {
        this.buffer.shift()
      }
    }
  }

  // Add a subscriber
  subscribe(handler: Handler): void {
    // Attach the handler
    this.handlers.add(handler)

    // Send the bufferedd data
    this.buffer.forEach((context: any) => {
      handler(context)
    })
  }

  // Remove a subscriber
  unsubscribe(handler: Handler): void {
    this.handlers.delete(handler)
  }
}

export default Postbus
