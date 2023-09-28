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
import ModelListPopup from "./ModelListPopup";
import { DeletePopup } from ".";

function DomainDashboardTable({ modelsList, getModelsList }) {
  const [columns] = useState([
    { name: "Model Name", uid: "model_name" },
    { name: "Base Model", uid: "base_model" },
    { name: "Source", uid: "source" },
    { name: "Tier", uid: "tier" },
    { name: "Dataset Name", uid: "dataset_name" },
    { name: "Status", uid: "status" },
    { name: "Task", uid: "task" },
    { name: "More", uid: "more" },
  ]);

  const [rowData, setRowData] = useState(modelsList);

  useState(() => {
    setRowData(modelsList);
  }, [modelsList]);

  const router = useRouter();

  const openModelPage = (model_id) => {
    router.push(`/dashboard/${model_id}`);
  };

  const [openPopupRowIndex, setOpenPopupRowIndex] = useState(-1);
  const [showDeletePopup, setshowDeletePopup] = useState(-1);

  const openDeletePopup = (index) => {
    setshowDeletePopup(index);
  };

  const closeDeletePopup = () => {
    setshowDeletePopup(-1);
  };

  const openPopup = (index) => {
    setOpenPopupRowIndex(index);
  };
  const closePopup = () => {
    setOpenPopupRowIndex(-1);
  };

  return (
    <Table>
      <TableHeader>
        {columns.map((items, index) => (
          <TableColumn
            className={`text-sm font-normal text-[#808080] border-b border-[rgba(128, 128, 128, 0.8)] pb-2  ${
              items.name == "More"
                ? "text-right"
                : items.name == "Source" || "Tier" || "Task" || "Base Model"
                ? "min-w-[100px] max-w-[100px]"
                : ""
            }`}
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
              onClick={() => openModelPage(item.model_id)}
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
                    Model ID: {item.model_id.substring(0, 6)}...
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                {item.base_model}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                {item.source}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                {item.tier === null ? "NA" : item.tier}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                {item.dataset_name === null ? "NA" : item.dataset_name}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                {item.status === null ? "Available" : item.status.toLowerCase()}
              </TableCell>
              <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                {item.task}
              </TableCell>
              <TableCell
                className="text-sm font-medium text-[#2D2E34] capitalize text-right flex justify-end relative"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Image
                  src="/more_horiz_color.svg"
                  alt="more"
                  width={20}
                  height={20}
                  className="object-contain cursor-pointer"
                  onClick={() => openPopup(index)}
                />
                {openPopupRowIndex === index && (
                  <ModelListPopup
                    onClose={closePopup}
                    openDeletePopup={openDeletePopup}
                    openPopupRowIndex={openPopupRowIndex}
                  />
                )}
                {showDeletePopup === index && (
                  <DeletePopup
                    modelName={item.model_name}
                    modelId={item.model_id}
                    getModelsList={getModelsList}
                    handleClose={closeDeletePopup}
                  />
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default DomainDashboardTable;
