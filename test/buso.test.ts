import Buso from '../src/buso'

// Convert
describe('Buso', () => {
  // Test simple string
  test('When publish happens all subscriptions are triggered', () => {
    // Setup the bus
    const buso = new Buso()

    // On publish trigger a jest fn
    const onPublish1 = jest.fn()
    const onPublish2 = jest.fn()

    // Dummy data
    const data = { test: true }

    // Subscribe and publish
    buso.subscribe(onPublish1)
    buso.subscribe(onPublish2)
    buso.publish(data)

    // Test if the event functions has been called
    expect(onPublish1).toHaveBeenCalledTimes(1)
    expect(onPublish2).toHaveBeenCalledTimes(1)
  })

  // Test data
  test('When subsrciber is called the data is passed correctly', () => {
    // Setup the bus
    const buso = new Buso()

    // Dummy data
    const data = { test: true }

    // Subscribe and publish
    buso.subscribe(context => {
      expect(context).toEqual(data)
    })
    buso.publish(data)
  })

  // Test event
  test('When subscribing the buffered data is sent', () => {
    // Setup the bus
    const buso = new Buso(2)

    // On event trigger a jest fn
    const onPublish = jest.fn()

    // Dummy data
    const data1 = { test: 'test1' }
    const data2 = { test: 'test2' }
    const data3 = { test: 'test3' }

    // Publish data before subscriptions
    buso.publish(data1)
    buso.publish(data2)
    buso.publish(data3)

    // Subscribe and see if we get the data
    buso.subscribe(onPublish)

    // Test if the event function has been called
    expect(onPublish).toHaveBeenCalledTimes(2)
  })

  // Test event
  test('When unsubscribing the subscriber is removed', () => {
    // Setup the bus
    const buso = new Buso()

    // On event trigger a jest fn
    const onPublish = jest.fn()

    // Dummy data
    const data = { test: true }

    // Subscribe and publish
    buso.subscribe(onPublish)
    buso.publish(data)

    // Unsubscribe and publish
    buso.unsubscribe(onPublish)
    buso.publish(data)

    // Test if the event function has been called
    expect(onPublish).toHaveBeenCalledTimes(1)
  })
})
