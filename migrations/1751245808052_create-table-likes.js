exports.up = (pgm) => {
  pgm.createTable('likes', {
    id_comment: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    id_user: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('likes');
};
