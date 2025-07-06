const UsersHandler = require('../handler');
const AddUserUseCase = require('../../../../../Applications/use_case/AddUserUseCase');

describe('UsersHandler', () => {
  it('UsersHandler post', async () => {
    const mockContaier = {
      getInstance: jest.fn(() => ({
        execute: jest.fn().mockResolvedValue({
          username: 'name_user',
          password: 'password_user',
          fullname: 'fullname user',
        }),
      })),
    };

    const mockRequest = {
      payload: {
        username: 'name_user',
        password: 'password_user',
        fullname: 'fullname user',
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

    const handler = new UsersHandler(mockContaier);
    const response = await handler.postUserHandler(mockRequest, mockH);

    expect(mockContaier.getInstance).toHaveBeenCalledWith(AddUserUseCase.name);

    expect(mockH.response).toHaveBeenCalledWith({
      status: 'success',
      data: {
        addedUser: {
          username: 'name_user',
          password: 'password_user',
          fullname: 'fullname user',
        },
      },
    });

    expect(response.code().statusCode).toEqual(201);
  });
});
