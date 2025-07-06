const VerifyReplies = require('../../Domains/replies/entities/VerifyReplies');

class AddRepliesUseCase {
  constructor({ repliesRepository, commentsRepository }) {
    this._repliesRepository = repliesRepository;
    this._commentsRepository = commentsRepository;
  }

  async execute(params, content, owner) {
    const { idThread, idComment, payload } = new VerifyReplies(params, content);
    const verifyId = await this._commentsRepository.verifyIdParams(idComment);

    if (verifyId !== idThread) {
      throw new Error('IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER');
    }

    const result = await this._repliesRepository.addReplies(
      idComment,
      payload,
      owner
    );

    return result;
  }
}

module.exports = AddRepliesUseCase;
