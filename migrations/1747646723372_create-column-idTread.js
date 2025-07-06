exports.up = (pgm) => {
  pgm.addColumn('comments', {
    id_thread: {
      type: 'VARCHAR(50)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('comments', 'id_thread');
};
