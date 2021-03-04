const SequenceCellRenderer = (props) => {
  const { index } = props;
  return (
    <div>
      <b>{Number(index) + 1}</b>
    </div>
  );
};

const SequenceHeaderRenderer = () => {
  return <div>#</div>;
};

export const useSequenceColumn = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    {
      id: "sequence",
      Header: SequenceHeaderRenderer,
      Cell: SequenceCellRenderer,
      width: 5,
      maxWidth: 5,
      minWidth: 5,
    },
    ...columns,
  ]);
};
