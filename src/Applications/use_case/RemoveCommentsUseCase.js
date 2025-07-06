class RemoveCommentsUseCase {
  constructor({ commentsRepository }) {
    this._commentsRepository = commentsRepository;
  }

  async execute(commentId, owner) {
    const verify = await this.verifyIdComment(commentId, owner);

    const result = await this._commentsRepository.removeComment(verify);
    return result;
  }

  async verifyIdComment(idComment, owner) {
    const result = await this._commentsRepository.getComments(idComment);

    if (!result[0]) {
      throw new Error('IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER');
    }

    if (result[0].owner !== owner) {
      throw new Error('USE_CASE_AUTHENTICATION.SPECIFICATION');
    }

    return idComment;
  }
}

module.exports = RemoveCommentsUseCase;
