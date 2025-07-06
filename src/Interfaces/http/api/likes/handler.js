const HandlerLikesUseCase = require('../../../../Applications/use_case/HandlerLikesUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;

    this.handlerLikesComent = this.handlerLikesComent.bind(this);
  }

  async handlerLikesComent(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const createLikes = this._container.getInstance(HandlerLikesUseCase.name);
    const result = await createLikes.execute(request.params, credentialId);

    return result;
  }
}

module.exports = LikesHandler;
