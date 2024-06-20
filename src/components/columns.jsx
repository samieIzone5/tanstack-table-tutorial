import { createColumnHelper } from "@tanstack/react-table";
import IndeterminateCheckBox from "./IndeterminateCheckBox";

const columnHelper = createColumnHelper();

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckBox
        {...{
          checked: table.getIsAllRowsSelected(),
          inderminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckBox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          inderminate: !row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
  }),
  {
    accessorFn: (row) => `${row.firstName}`,
    header: "First Name",
    footer: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    footer: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    footer: "Last Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    footer: "Phone Number",
  },
  {
    accessorKey: "date",
    header: "Date",
    footer: "Date",
  },
];
