import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import data from "../data.json";
import { columns } from "./columns";
import { useMemo, useState } from "react";
import Filter from "./FilterFunction";

export default function ColumnFiltering() {
  const [columnFilters, setColumnFilters] = useState([]);

  const finalData = useMemo(() => {
    return data;
  }, []);
  const finalColumns = useMemo(() => {
    return columns;
  }, []);
  const defaultColumn = useMemo(() => {
    return {
      youtubeProps: "Hello World",
    };
  }, []);

  // create a table instance
  const table = useReactTable({
    columns: finalColumns,
    data: finalData,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      columnFilters: columnFilters,
    },

    // onChange
    onColumnFiltersChange: setColumnFilters,
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
                      <div>
                        {flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}

                        {columnEl.column.getCanFilter() ? (
                          <div>
                            <Filter column={columnEl.column} table={table} />
                          </div>
                        ) : null}
                      </div>
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
