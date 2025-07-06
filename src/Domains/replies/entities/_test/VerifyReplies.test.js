const VerifyReplies = require('../VerifyReplies');

describe('VerifyReplies Entity', () => {
  it('should throw error when params_and_payload_Null', () => {
    expect(() => new VerifyReplies({}, null)).toThrowError(
      'VERIFY_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when threadId_number', () => {
    const params = { threadId: 123, commentId: 'comment-123' };
    const content = 'payload replies';

    expect(() => new VerifyReplies(params, content)).toThrowError(
      'VERIFY_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when commentId_number', () => {
    const params = { threadId: 'thread-123', commentId: 123 };
    const content = 'payload replies';

    expect(() => new VerifyReplies(params, content)).toThrowError(
      'VERIFY_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when content_object', () => {
    const params = { threadId: 'thread-123', commentId: 'comment-123' };
    const content = { text: 'payload replies' };

    expect(() => new VerifyReplies(params, content)).toThrowError(
      'VERIFY_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('VerifyReplies falid', () => {
    const params = { threadId: 'thread-123', commentId: 'comment-123' };
    const content = 'payload replies';

    const verifyReplies = new VerifyReplies(params, content);

    expect(verifyReplies.idThread).toEqual(params.threadId);
    expect(verifyReplies.idComment).toEqual(params.commentId);
    expect(verifyReplies.payload).toEqual(content);
  });
});
