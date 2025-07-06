class HandlerLikesUseCase {
  constructor({ likesRepository, commentsRepository, threadsRepository }) {
    this._likesRepository = likesRepository;
    this._commentsRepository = commentsRepository;
    this._threadsRepository = threadsRepository;
  }

  async execute(params, owner) {
    const { threadId, commentId } = params;
    await this.verifyParams(threadId, commentId);

    try {
      const dataComment = await this._likesRepository.getLikeComment(owner);

      if (commentId === dataComment) {
        await this._likesRepository.removeLikeComment(owner);
      } else {
        await this._likesRepository.addLikeComment(commentId, owner);
      }
    } catch {
      await this._likesRepository.addLikeComment(commentId, owner);
    }

    return { status: 'success' };
  }

  async verifyParams(threadId, commentId) {
    const thread_id = await this._threadsRepository.verifyIdThread(threadId);
    const comment_id = await this._commentsRepository.verifyIdParams(commentId);

    if (!thread_id) {
      throw new Error('IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER');
    }
    if (!comment_id) {
      throw new Error('IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER');
    }
  }
}

module.exports = HandlerLikesUseCase;
