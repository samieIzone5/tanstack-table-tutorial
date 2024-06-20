import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('id', {
    header: "ID",
    footer: "ID"
  }),
  {
    accessorFn: (row) => `${row.firstName}`,
    header: "First Name",
    footer: "First Name"
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    footer: "Last Name"
  },
  {
    accessorKey: "email",
    header: "Email",
    footer: "Last Name"
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    footer: "Phone Number"
  },
  {
    accessorKey: "date",
    header: "Date",
    footer: "Date"
  },
];



