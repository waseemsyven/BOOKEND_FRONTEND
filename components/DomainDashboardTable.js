"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
function DomainDashboardTable({ modelsList }) {
  const [columns] = useState([
    { name: "Model Name", uid: "model_name" },
    { name: "Source", uid: "source" },
    { name: "Tier", uid: "tier" },
    { name: "Dataset Name", uid: "dataset_name" },
    { name: "Status", uid: "status" },
    { name: "task", uid: "task" },
  ]);

  const [rowData, setRowData] = useState(modelsList);
  const router = useRouter();

  const openModelPage = (modelName) => {
    router.push(`/models/${modelName}`);
  };

  return (
    <Table>
      <TableHeader>
        {columns.map((items, index) => (
          <TableColumn
            className="text-sm font-normal text-[#808080] border-b border-[rgba(128, 128, 128, 0.8)] pb-2 min-w-[100px]"
            key={index}
          >
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
              onClick={() => openModelPage(item.model_name)}
            >
              <TableCell className="flex gap-2 py-2">
                <Image
                  src="/deployed.svg"
                  alt="deployed"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div>
                  {" "}
                  <h2 className="text-sm font-semibold text-[#2D2E34]">
                    {item.model_name}
                  </h2>
                  <p className="text-xs	text-[#666] font-medium">
                    Model ID 32 bit
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34]">
                {item.source}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34]">
                {item.tier}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34]">
                {item.dataset_name}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34]">
                {item.status}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34]">
                {item.task}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default DomainDashboardTable;
