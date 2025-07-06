const ThreadsHandler = require('../handler');
const AddThreadsUseCase = require('../../../../../Applications/use_case/AddThreadsUseCase');
const GetThreadsUseCase = require('../../../../../Applications/use_case/GetThreadsUseCase');

describe('ThreadsHandler', () => {
  it('ThreadsHandler post', async () => {
    const mockContaier = {
      getInstance: jest.fn(() => ({
        execute: jest.fn().mockResolvedValue({
          payload: 'payload thread',
          credentialId: 'user-123',
        }),
      })),
    };

    const mockRequest = {
      payload: {
        title: 'title thread',
        body: 'body thread',
      },

      auth: {
        credentials: {
          credentialId: 'user-123',
        },
      },
    };

    const mockH = {
      response: jest.fn().mockImplementation((response) => ({
        code: jest.fn().mockReturnValue({
          ...response,
          statusCode: 201,
        }),
      })),
    };

    const handler = new ThreadsHandler(mockContaier);
    const response = await handler.postThreadHandler(mockRequest, mockH);

    expect(mockContaier.getInstance).toHaveBeenCalledWith(
      AddThreadsUseCase.name
    );

    const mockExpect = await mockContaier.getInstance().execute();
    expect(mockExpect).toEqual({
      payload: 'payload thread',
      credentialId: 'user-123',
    });

    expect(response.code()).toEqual({
      status: 'success',
      data: {
        addedThread: mockExpect,
      },
      statusCode: 201,
    });

    expect(response.code().statusCode).toEqual(201);
  });

  it('ThreadsHandler Get', async () => {
    const mockContaier = {
      getInstance: jest.fn(() => ({
        execute: jest.fn().mockResolvedValue({
          threadId: 'thread-123',
        }),
      })),
    };

    const mockH = {
      response: jest.fn().mockImplementation((response) => ({
        code: jest.fn().mockReturnValue({
          ...response,
          statusCode: 201,
        }),
      })),
    };

    const mockRequest = {
      params: {
        threadId: 'thread-123',
      },
    };

    const handler = new ThreadsHandler(mockContaier);
    const request = await handler.getThreadHandler(mockRequest, mockH);

    expect(mockContaier.getInstance).toHaveBeenCalledWith(
      GetThreadsUseCase.name
    );

    expect(mockH.response).toHaveBeenCalledWith({
      status: 'success',
      data: {
        thread: {
          threadId: 'thread-123',
        },
      },
    });

    expect(request.code().statusCode).toEqual(201);
  });
});
