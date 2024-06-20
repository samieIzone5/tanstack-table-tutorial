import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import data from "../data.json";
import { columns } from "./columns";
import { useMemo, useState } from "react";
import DebouncedInput from "./DebouncedInput";

export default function GlobalFiltering() {
  const [filtering, setFiltering] = useState("");
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
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      globalFilter: filtering,
    },

    // onChange
    onColumnFiltersChange: setFiltering,
  });
  console.log({ filtering });

  return (
    <div>
      <DebouncedInput
        className="border mb-8 py-2 px-4 rounded-lg"
        type="text"
        value={filtering}
        onChange={(value) => setFiltering(value)}
      />
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
    </div>
  );
}
