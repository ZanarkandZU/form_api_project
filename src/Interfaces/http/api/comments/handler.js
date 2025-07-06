const CreateCommentsUseCase = require('../../../../Applications/use_case/CreateCommentsUseCase');
const RemoveCommentsUseCase = require('../../../../Applications/use_case/RemoveCommentsUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.removeCommentHandler = this.removeCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const { threadId } = request.params;
    const { content } = request.payload;

    const createComment = this._container.getInstance(
      CreateCommentsUseCase.name
    );
    const addedComment = await createComment.execute(
      threadId,
      content,
      credentialId
    );

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async removeCommentHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { commentId } = request.params;

    const removeComment = this._container.getInstance(
      RemoveCommentsUseCase.name
    );

    const response = await removeComment.execute(commentId, credentialId);

    return response;
  }
}

module.exports = CommentsHandler;
