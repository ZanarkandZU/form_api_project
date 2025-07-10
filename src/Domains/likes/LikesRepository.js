class LikesRepository {
  async addLikeComment(idComment, owner) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async getLikeComment(idComment, owner) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async removeLikeComment(owner) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
  async getLikesCommentRows(idComment) {
    throw new Error('LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = LikesRepository;
