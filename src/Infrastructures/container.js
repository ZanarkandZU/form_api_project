/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepository = require('../Domains/users/UserRepository');
const PasswordHash = require('../Applications/security/PasswordHash');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const JwtTokenManager = require('./security/JwtTokenManager');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const ThreadsRepository = require('../Domains/threads/ThreadsRepository');
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres');
const AddThreadsUseCase = require('../Applications/use_case/AddThreadsUseCase');
const GetThreadsUseCase = require('../Applications/use_case/GetThreadsUseCase');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const CommentsRepository = require('../Domains/comments/CommentsRepository');
const CommentRepositoryPostgres = require('./repository/CommentRepositoryPostgres');
const CreateCommentsUseCase = require('../Applications/use_case/CreateCommentsUseCase');
const RemoveCommentsUseCase = require('../Applications/use_case/RemoveCommentsUseCase');
const DeleteRepliesUseCase = require('../Applications/use_case/DeleteRepliesUseCase');
const RepliesRepositoryPostgres = require('./repository/RepliesRepositoryPostgres');
const AddRepliesUseCase = require('../Applications/use_case/AddRepliesUseCase');
const RepliesRepository = require('../Domains/replies/RepliesRepository');

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: ThreadsRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: CommentsRepository.name,
    Class: CommentRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: RepliesRepository.name,
    Class: RepliesRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: AddThreadsUseCase.name,
    Class: AddThreadsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadsRepository',
          internal: ThreadsRepository.name,
        },
      ],
    },
  },

  {
    key: CreateCommentsUseCase.name,
    Class: CreateCommentsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentsRepository',
          internal: CommentsRepository.name,
        },
        {
          name: 'threadsRepository',
          internal: ThreadsRepository.name,
        },
      ],
    },
  },
  {
    key: RemoveCommentsUseCase.name,
    Class: RemoveCommentsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'commentsRepository',
          internal: CommentsRepository.name,
        },
      ],
    },
  },
  {
    key: AddRepliesUseCase.name,
    Class: AddRepliesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'repliesRepository',
          internal: RepliesRepository.name,
        },
        {
          name: 'commentsRepository',
          internal: CommentsRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteRepliesUseCase.name,
    Class: DeleteRepliesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'repliesRepository',
          internal: RepliesRepository.name,
        },
      ],
    },
  },
  {
    key: GetThreadsUseCase.name,
    Class: GetThreadsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadsRepository',
          internal: ThreadsRepository.name,
        },
        {
          name: 'commentsRepository',
          internal: CommentsRepository.name,
        },
        {
          name: 'repliesRepository',
          internal: RepliesRepository.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
]);

module.exports = container;
