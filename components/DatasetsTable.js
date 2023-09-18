"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import DatasetListPopup from "./DatasetListPopup";
import { DeletePopup } from ".";

function DatasetsTable({ datasetsList, getDataSetsList }) {
  const [columns] = useState([
    { name: "Name", uid: "dataset_name" },
    { name: "Source", uid: "source" },
    { name: "Dataset Id", uid: "dataset_name" },
    { name: "Task", uid: "task" },
    { name: "More", uid: "more" },
  ]);

  const [rowData, setRowData] = useState(datasetsList);

  useEffect(() => {
    setRowData(datasetsList);
  }, [datasetsList]);

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
    <>
      <Table className="bg-white py-4 rounded-[8px] shadow">
        <TableHeader>
          {columns.map((items, index) => (
            <TableColumn
              className={`text-sm font-normal text-[#808080] border-b border-[rgba(128, 128, 128, 0.8)] pb-2 min-w-[100px] ${
                items.name == "More" && "text-right pr-4"
              }`}
              key={index}
            >
              <h2>{items.name}</h2>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rowData.map((item, index) => {
            return (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-[#F7FAFB]"
              >
                <TableCell className="flex gap-2 py-2 text-sm font-semibold text-[#2D2E34] capitalize">
                  <h2 className="">{item.dataset_name}</h2>
                </TableCell>

                <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                  {item.source}
                </TableCell>
                <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                  {item.dataset_id}
                </TableCell>
                <TableCell className="text-sm font-medium text-[#2D2E34] capitalize">
                  {item.task}
                </TableCell>
                <TableCell
                  className="text-sm font-medium text-[#2D2E34] capitalize text-right flex justify-end pr-4 relative"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Image
                    src="/more_horiz.svg"
                    alt="more"
                    width={20}
                    height={20}
                    className="object-contain cursor-pointer"
                    onClick={() => openPopup(index)}
                  />
                  {openPopupRowIndex === index && (
                    <DatasetListPopup
                      onClose={closePopup}
                      openDeletePopup={openDeletePopup}
                      openPopupRowIndex={openPopupRowIndex}
                    />
                  )}
                  {showDeletePopup === index && (
                    <DeletePopup
                      modelName={item.dataset_name}
                      modelId={item.dataset_id}
                      handleClose={closeDeletePopup}
                      type="dataset"
                      getDataSetsList={getDataSetsList}
                    />
                  )}
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
