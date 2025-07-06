const AddRepliesUseCase = require('../../../../Applications/use_case/AddRepliesUseCase');
const DeleteRepliesUseCase = require('../../../../Applications/use_case/DeleteRepliesUseCase');

class RepliesHandler {
  constructor(container) {
    this._container = container;

    this.postReplieHandler = this.postReplieHandler.bind(this);
    this.deleteReplieHandler = this.deleteReplieHandler.bind(this);
  }

  async postReplieHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const idParams = request.params;
    const { content } = request.payload;

    const addRepliesUseCase = this._container.getInstance(
      AddRepliesUseCase.name
    );
    const addedReply = await addRepliesUseCase.execute(
      idParams,
      content,
      credentialId
    );

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteReplieHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const idReplies = request.params;

    const deleteRepliesUseCase = this._container.getInstance(
      DeleteRepliesUseCase.name
    );

    const response = await deleteRepliesUseCase.execute(
      idReplies,
      credentialId
    );

    return response;
  }
}

module.exports = RepliesHandler;
