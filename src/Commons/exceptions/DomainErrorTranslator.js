const InvariantError = require('./InvariantError');
const NotFoundError = require('./NotFoundError');
const AuthorizationError = require('./AuthorizationError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'
  ),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat user baru karena tipe data tidak sesuai'
  ),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter username melebihi batas limit'
  ),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
    'tidak dapat membuat user baru karena username mengandung karakter terlarang'
  ),
  'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tipe data yang dimasukkan salah'
  ),
  'THREADID.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tipe data yang dimasukkan salah'
  ),
  'THREADID.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tipe data yang dimasukkan salah'
  ),

  'VERIFY_REPLIES.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'terdapat data belum dimasukkan'
  ),
  'VERIFY_REPLIES.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tipe data yang dimasukkan salah'
  ),

  'VERIFY_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tipe data yang dimasukkan salah'
  ),
  'VERIFY_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tipe data yang dimasukkan salah'
  ),
  'IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER': new NotFoundError(
    'id thread tidak ditemukan'
  ),
  'IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER': new NotFoundError(
    'id comment tidak ditemukan'
  ),
  'IDREPLY.ID_CONTAIN_NOTDEFINED_CHARACTER': new NotFoundError(
    'id reply tidak ditemukan'
  ),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'harus mengirimkan username dan password'
  ),

  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'username dan password harus string'
  ),
  'USE_CASE_AUTHENTICATION.SPECIFICATION': new AuthorizationError(
    'comment ini tidak bisa di hapus'
  ),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
};

module.exports = DomainErrorTranslator;
