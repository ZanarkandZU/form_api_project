class DeleteRepliesUseCase {
  constructor({ repliesRepository }) {
    this._repliesRepository = repliesRepository;
  }

  async execute(params, owner) {
    const { replieId } = params;
    await this.newVerify(replieId, owner);

    const result = await this._repliesRepository.deleteReplies(replieId);
    return result;
  }

  async newVerify(idReplies, owner) {
    const verify = await this._repliesRepository.verifyIdReplies(idReplies);

    if (!verify) {
      throw new Error('IDREPLY.ID_CONTAIN_NOTDEFINED_CHARACTER');
    }

    if (verify.owner !== owner) {
      throw new Error('USE_CASE_AUTHENTICATION.SPECIFICATION');
    }
  }
}

module.exports = DeleteRepliesUseCase;
