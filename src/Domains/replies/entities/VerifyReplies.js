class VerifyReplies {
  constructor(params, content) {
    this._verify(params, content);

    this.idThread = params.threadId;
    this.idComment = params.commentId;
    this.payload = content;
  }

  _verify(params, content) {
    const { threadId, commentId } = params;

    if (!threadId || !commentId || !content) {
      throw new Error('VERIFY_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof commentId !== 'string') {
      throw new Error('VERIFY_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (typeof content !== 'string') {
      throw new Error('VERIFY_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = VerifyReplies;
