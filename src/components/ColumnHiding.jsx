import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import data from "../data.json";
import { columns } from "./columns";
import { useMemo, useState } from "react";

export default function ColumnHiding() {
  const finalData = useMemo(() => {
    return data;
  }, []);
  const finalColumns = useMemo(() => {
    return columns;
  }, []);

  const [columnOrder, setColumnOrder] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  // create a table instance
  const table = useReactTable({
    columns: finalColumns,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),

    state: {
      columnOrder: columnOrder,
      columnVisibility: columnVisibility,
    },

    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div>
      <button onClick={() => setColumnOrder(["date", "email"])}>
        change order
      </button>
      <div>
        <label>
          <input
            {...{
              type: "checkbox",
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />
          Toggle All
        </label>
      </div>
      {table.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id}>
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />
              {column.id}
            </label>
          </div>
        );
      })}

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
