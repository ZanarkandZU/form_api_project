exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    content: {
      type: 'TEXT',
      notNull: true,
    },

    date: {
      type: 'TEXT',
      notNull: true,
    },

    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    id_comment: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    is_delete: {
      type: 'BOOLEAN',
      default: false,
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('replies');
};
