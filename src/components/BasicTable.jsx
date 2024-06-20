import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import data from "../data.json";
import { columns } from "./columns";
import { useMemo } from "react";

export default function BasicTable() {
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
    </div>
  );
}
