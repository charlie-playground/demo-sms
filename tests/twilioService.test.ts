import { jest } from '@jest/globals';

describe('twilioService.sendMessage', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clear module cache.
    process.env = { ...OLD_ENV }; // Clone original env.
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore original env after each test.
    jest.clearAllMocks();
  });

  it('sends message when env is configured', async () => {
    // Arrange env
    process.env.TWILIO_ACCOUNT_SID = 'AC123';
    process.env.TWILIO_AUTH_TOKEN = 'TOKEN';
    process.env.TWILIO_FROM_NUMBER = '+15005550006';

    // Mock twilio factory
    const createMock = jest.fn().mockResolvedValue({ sid: 'SM123' });
    const twilioFactoryMock = jest.fn().mockReturnValue({
      messages: { create: createMock }
    });

    jest.unstable_mockModule('twilio', () => ({
      default: twilioFactoryMock
    }));

    const { twilio } = await import('../src/services/twilioService.js');

    // Act
    await twilio.sendMessage('+14155550123', 'hello');

    // Assert
    expect(twilioFactoryMock).toHaveBeenCalledWith(
      'AC123',
      'TOKEN'
    );
    expect(createMock).toHaveBeenCalledWith({
      from: '+15005550006',
      to: '+14155550123',
      body: 'hello'
    });
  });

  it('throws if required env vars are missing', async () => {
    jest.unstable_mockModule('twilio', () => ({
      default: jest.fn()
    }));

    const { twilio } = await import('../src/services/twilioService.js');

    await expect(
      twilio.sendMessage('+14155550123', 'hello')
    ).rejects.toThrow(/Missing Twilio credentials/);
  });
});
