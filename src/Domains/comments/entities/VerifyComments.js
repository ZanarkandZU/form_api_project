class VerifyComments {
  constructor(idThread, payload) {
    this._verify(idThread, payload);

    this.idThread = idThread;
    this.payload = payload;
  }

  _verify(idThread, payload) {
    if (!idThread || !payload) {
      throw new Error('VERIFY_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof idThread !== 'string' || typeof payload !== 'string') {
      throw new Error('VERIFY_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = VerifyComments;
