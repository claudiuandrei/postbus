import Postbus from '../src/postbus'

// Convert
describe('Postbus', () => {
  // Test simple string
  test('When publish happens all subscriptions are triggered', () => {
    // Setup the bus
    const bus = new Postbus()

    // On publish trigger a jest fn
    const onPublish1 = jest.fn()
    const onPublish2 = jest.fn()

    // Dummy data
    const data = { test: true }

    // Subscribe and publish
    bus.subscribe(onPublish1)
    bus.subscribe(onPublish2)
    bus.publish(data)

    // Test if the event functions has been called
    expect(onPublish1).toHaveBeenCalledTimes(1)
    expect(onPublish2).toHaveBeenCalledTimes(1)
  })

  // Test data
  test('When subsrciber is called the data is passed correctly', () => {
    // Setup the bus
    const bus = new Postbus()

    // Dummy data
    const data = { test: true }

    // Subscribe and publish
    bus.subscribe(context => {
      expect(context).toEqual(data)
    })
    bus.publish(data)
  })

  // Test event
  test('When subscribing the buffered data is sent', () => {
    // Setup the bus
    const bus = new Postbus(2)

    // On event trigger a jest fn
    const onPublish = jest.fn()

    // Dummy data
    const data1 = { test: 'test1' }
    const data2 = { test: 'test2' }
    const data3 = { test: 'test3' }

    // Publish data before subscriptions
    bus.publish(data1)
    bus.publish(data2)
    bus.publish(data3)

    // Subscribe and see if we get the data
    bus.subscribe(onPublish)

    // Test if the event function has been called
    expect(onPublish).toHaveBeenCalledTimes(2)
  })

  // Test event
  test('When unsubscribing the subscriber is removed', () => {
    // Setup the bus
    const bus = new Postbus()

    // On event trigger a jest fn
    const onPublish = jest.fn()

    // Dummy data
    const data = { test: true }

    // Subscribe and publish
    const unsubscribe = bus.subscribe(onPublish)
    bus.publish(data)

    // Unsubscribe and publish
    unsubscribe()
    bus.publish(data)

    // Test if the event function has been called
    expect(onPublish).toHaveBeenCalledTimes(1)
  })
})
