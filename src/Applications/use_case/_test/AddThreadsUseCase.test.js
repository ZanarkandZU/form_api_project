const AddThreadsUseCase = require('../AddThreadsUseCase');

describe('AddThreadsUseCase', () => {
  let mockThreadsRepository;
  let useCase;

  beforeEach(() => {
    mockThreadsRepository = {
      addThreads: jest.fn(),
    };

    useCase = new AddThreadsUseCase({
      threadsRepository: mockThreadsRepository,
    });
  });

  describe('execute', () => {
    it('should throw error when payload does not contain needed properties', async () => {
      const payload = { title: 'title only' };

      await expect(useCase.execute(payload, 'user-123')).rejects.toThrow(
        'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
      );
    });

    it('should throw error when payload properties have wrong data types', async () => {
      const payload = { title: 123, body: true };

      await expect(useCase.execute(payload, 'user-123')).rejects.toThrow(
        'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
      );
    });

    it('should call addThreads and return result correctly', async () => {
      const payload = { title: 'Thread Title', body: 'Thread Body' };
      const owner = 'user-123';

      const mockAddedThread = {
        id: 'thread-123',
        title: payload.title,
        owner: owner,
      };

      const expectedReturn = {
        id: 'thread-123',
        title: payload.title,
        owner: owner,
      };

      mockThreadsRepository.addThreads.mockResolvedValue(mockAddedThread);

      const result = await useCase.execute(payload, owner);

      expect(mockThreadsRepository.addThreads).toHaveBeenCalledWith(
        payload,
        owner
      );
      expect(result).toEqual(expectedReturn);
    });
  });
});
