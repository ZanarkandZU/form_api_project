class GetThreadsUseCase {
  constructor({
    threadsRepository,
    commentsRepository,
    repliesRepository,
    userRepository,
    likesRepository,
  }) {
    this._threadsRepository = threadsRepository;
    this._commentsRepository = commentsRepository;
    this._repliesRepository = repliesRepository;
    this._userRepository = userRepository;
    this._likesRepository = likesRepository;
  }

  async execute(params) {
    const getThreads = await this._threadsRepository.getCompletThreads(params);
    const owner = await this._userRepository.getUsernameByIdUser(
      getThreads.owner
    );

    const newComment = await this._newComment(params);

    getThreads.username = owner;
    getThreads.comments = newComment;

    return getThreads;
  }

  async _newComment(params) {
    const comments = await this._commentsRepository.getCommentByIdThread(
      params
    );

    for (let i = 0; i < comments.length; i++) {
      const owner = await this._userRepository.getUsernameByIdUser(
        comments[i].owner
      );
      const newReplies = await this._newReplies(comments[i].id);
      const newlikes = await this._likesRepository.getLikesCommentRows(
        comments[i].id
      );
      comments[i].username = owner;
      comments[i].replies = newReplies;
      comments[i].likeCount = newlikes;
    }

    const resultRows = comments.map(
      ({ id, content, date, username, is_delete, replies, likeCount }) => {
        return {
          id,
          username,
          date,
          replies,
          content: is_delete ? '**komentar telah dihapus**' : content,
          likeCount,
        };
      }
    );

    return resultRows;
  }

  async _newReplies(commentId) {
    const reply = await this._repliesRepository.getReplyByIdComment(commentId);

    for (let i = 0; i < reply.length; i++) {
      const _owner = await this._userRepository.getUsernameByIdUser(
        reply[i].owner
      );
      reply[i].username = _owner;
    }

    const resultRows = reply.map(
      ({ id, content, date, username, is_delete }) => {
        return {
          id,
          content: is_delete ? '**balasan telah dihapus**' : content,
          date,
          username,
        };
      }
    );

    return resultRows;
  }
}

module.exports = GetThreadsUseCase;
