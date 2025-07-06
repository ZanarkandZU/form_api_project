class AddThreadsUseCase {
  constructor({ threadsRepository }) {
    this._threadsRepository = threadsRepository;
  }

  async execute(payload, owner) {
    this._verifyPayload(payload);
    
    const result = await this._threadsRepository.addThreads(payload, owner);

    return result;
  }

  _verifyPayload(payload) {
    const { title, body } = payload;

    if (!title || !body) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}

module.exports = AddThreadsUseCase;
