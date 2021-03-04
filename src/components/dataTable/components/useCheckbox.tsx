import Checkbox from "@material-ui/core/Checkbox";

export const useCheckboxColumn = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    {
      id: "selectionCheckbox",
      Header: CheckboxHeaderRenderer,
      Cell: CheckboxCellRenderer,
      minWidth: 20,
      width: 20,
      maxWidth: 20,
      sticky: true,
    },
    ...columns,
  ]);
};

const CheckboxCellRenderer = ({ row }) => {
  return (
    <Checkbox
      size="small"
      {...row.getToggleRowSelectedProps([
        {
          style: {
            padding: 0,
          },
        },
      ])}
    />
  );
};

const CheckboxHeaderRenderer = ({ getToggleAllPageRowsSelectedProps }) => {
  return (
    <Checkbox
      size="small"
      {...getToggleAllPageRowsSelectedProps([{ style: { padding: 0 } }])}
    />
  );
};
