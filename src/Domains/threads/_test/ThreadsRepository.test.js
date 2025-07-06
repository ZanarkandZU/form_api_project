const ThreadsRepository = require('../ThreadsRepository');

describe('ThreadsRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const threadsRepository = new ThreadsRepository();

    await expect(threadsRepository.addThreads({})).rejects.toThrowError(
      'THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(threadsRepository.getThreads('')).rejects.toThrowError(
      'THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(threadsRepository.getComment('')).rejects.toThrowError(
      'THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
