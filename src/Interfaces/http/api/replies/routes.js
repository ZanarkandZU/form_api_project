const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postReplieHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },

  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replieId}',
    handler: handler.deleteReplieHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
