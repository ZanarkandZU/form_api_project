const routes = require('./routes');
const HandlerLikes = require('./handler');

module.exports = {
  name: 'likes',
  register: async (server, { container }) => {
    const handler = new HandlerLikes(container);
    server.route(routes(handler));
  },
};
