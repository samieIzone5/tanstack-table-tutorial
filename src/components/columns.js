import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
  }),
  {
    header: "Name",
    columns: [
      {
        accessorFn: (row) => `${row.firstName}`,
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
    ],
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => new Date(getValue()).toUTCString(),
  },
];

export const columnsWithMerge = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
  }),
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName} ${row.gender}`,
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];





