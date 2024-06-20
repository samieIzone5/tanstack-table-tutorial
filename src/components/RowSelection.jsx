import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import data from "../data.json";
import { columns } from "./columns.jsx";
import { useMemo, useState } from "react";

export default function RowSelection() {
  const [rowSelection, setRowSelection] = useState({});

  const finalData = useMemo(() => {
    return data;
  }, []);
  const finalColumns = useMemo(() => {
    return columns;
  }, []);
  // create a table instance
  const table = useReactTable({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,

    state: {
      rowSelection: rowSelection,
    },

    // onChange
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id}>
                      {flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <ul>
          {table.getSelectedRowModel().flatRows.map((el) => {
            return <li key={el.id}>{JSON.stringify(el.original)}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
