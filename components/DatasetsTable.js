"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

function DatasetsTable({ datasetsList }) {
  const [columns] = useState([
    { name: "Name", uid: "dataset_name" },
    { name: "Added on", uid: "" },
    { name: "Source", uid: "source" },
    { name: "Dataset Name", uid: "dataset_name" },
    { name: "task", uid: "task" },
  ]);

  const [rowData, setRowData] = useState(datasetsList);

  return (
    <>
      <Table className="bg-white py-4 rounded-[8px] shadow-md">
        <TableHeader>
          {columns.map((items) => (
            <TableColumn className="text-sm font-normal text-[#808080] border-b border-[rgba(128, 128, 128, 0.8)] pb-2 min-w-[100px]">
              {items.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rowData.map((item, index) => {
            return (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-[#F7FAFB]"
                //   onClick={() => openModelPage(item.dataset_name)}
              >
                <TableCell className="flex gap-2 py-2 text-sm font-semibold text-[#2D2E34]">
                  <h2 className="">{item.dataset_name}</h2>
                </TableCell>
                <TableCell className="text-sm font-medium text-[#2D2E34]">
                  {/* {Date.current()} */}
                </TableCell>
                <TableCell className="text-sm font-medium text-[#2D2E34]">
                  {item.source}
                </TableCell>
                <TableCell className="text-sm font-medium text-[#2D2E34]">
                  {item.dataset_name}
                </TableCell>
                <TableCell className="text-sm font-medium text-[#2D2E34]">
                  {item.task}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default DatasetsTable;
