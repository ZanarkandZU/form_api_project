const VerifyComments = require('../VerifyComments');

describe('VerifyComments funcions', () => {
  it('Verifycomments params_and_payload_Null', () => {
    expect(() => new VerifyComments(null, null)).toThrowError(
      'VERIFY_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should verify Idthread_number', () => {
    const payload = 'payload comment';

    expect(() => new VerifyComments(123, payload)).toThrowError(
      'VERIFY_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should verify paload_object', () => {
    const threadId = 'thread-123';
    const payload = { text: 'payload comment' };

    expect(() => new VerifyComments(threadId, payload)).toThrowError(
      'VERIFY_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('VerifyComments falid', () => {
    const idThread = 'thread-123';
    const payload = 'comment payload';

    const verifyComments = new VerifyComments(idThread, payload);

    expect(verifyComments.idThread).toEqual(idThread);
    expect(verifyComments.payload).toEqual(payload);
  });
});
