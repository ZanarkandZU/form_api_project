const AuthenticationsHandler = require('../handler');
const LoginUserUseCase = require('../../../../../Applications/use_case/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../../../../../Applications/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../../../../../Applications/use_case/LogoutUserUseCase');

describe('AuthenticationsHandler', () => {
  describe('postAuthenticationHandler', () => {
    it('should handle POST /authentications correctly', async () => {
      // Arrange
      const mockContainer = {
        getInstance: jest.fn(() => ({
          execute: jest.fn().mockResolvedValue({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
          }),
        })),
      };

      const mockRequest = {
        payload: {
          username: 'user123',
          password: 'password123',
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

      const handler = new AuthenticationsHandler(mockContainer);

      // Act
      const response = await handler.postAuthenticationHandler(
        mockRequest,
        mockH
      );

      // Assert
      expect(mockContainer.getInstance).toHaveBeenCalledWith(
        LoginUserUseCase.name
      );

      expect(mockH.response).toHaveBeenCalledWith({
        status: 'success',
        data: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });

      expect(response.code().statusCode).toEqual(201);
    });
  });

  describe('putAuthenticationHandler', () => {
    it('should handle PUT /authentications correctly', async () => {
      // Arrange
      const mockContainer = {
        getInstance: jest.fn(() => ({
          execute: jest.fn().mockResolvedValue('new_access_token'),
        })),
      };

      const mockRequest = {
        payload: {
          refreshToken: 'valid_refresh_token',
        },
      };

      const handler = new AuthenticationsHandler(mockContainer);

      // Act
      const response = await handler.putAuthenticationHandler(mockRequest);

      // Assert
      expect(mockContainer.getInstance).toHaveBeenCalledWith(
        RefreshAuthenticationUseCase.name
      );

      expect(response).toEqual({
        status: 'success',
        data: {
          accessToken: 'new_access_token',
        },
      });
    });
  });

  describe('deleteAuthenticationHandler', () => {
    it('should handler delete fun', async () => {
      const mockContainer = {
        getInstance: jest.fn(() => ({
          execute: jest.fn().mockResolvedValue('refres_access_token'),
        })),
      };

      const request = {
        payload: {
          refreshToken: 'refres_access_token',
        },
      };

      const handler = new AuthenticationsHandler(mockContainer);
      const mockResult = await handler.deleteAuthenticationHandler(request);

      expect(mockContainer.getInstance).toHaveBeenCalledWith(
        LogoutUserUseCase.name
      );

      expect(mockResult).toEqual({
        status: 'success',
      });
    });
  });
});
