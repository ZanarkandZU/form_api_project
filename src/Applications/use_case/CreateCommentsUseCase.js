const VerifyComments = require('../../Domains/comments/entities/VerifyComments');

class CreateCommentsUseCase {
  constructor({ commentsRepository, threadsRepository }) {
    this._commentsRepository = commentsRepository;
    this._threadsRepository = threadsRepository;
  }

  async execute(threadId, content, owner) {
    const { payload } = new VerifyComments(threadId, content);
    const verifyId = await this._threadsRepository.verifyIdThread(threadId);

    if (!verifyId) {
      throw new Error('IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER');
    }

    const result = await this._commentsRepository.createComment(
      payload,
      owner,
      verifyId.id
    );

    return result;
  }
}

module.exports = CreateCommentsUseCase;
