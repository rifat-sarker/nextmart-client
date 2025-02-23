"use client";
import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Trash } from "lucide-react";
import CreateCategoryModal from "./CreateCategoryModal";
import { NMTable } from "@/components/ui/core/NMTable";

type TCategoriesProps = {
  categories: ICategory[];
};

  const handleDelete = (data: ICategory) => {
    console.log(data);
  };


export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Image
          src={row.original.icon}
          alt={row.original.name}
          height={40}
          width={40}
          className="w-8 h-8 round-full"
        />
        <span className="truncate">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: () => <div>isActive</div>,
    cell: ({ row }) => (
      <div>
        {row.original.isActive ? (
          <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
            True
          </p>
        ) : (
          <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
            False
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: () => <div>Action</div>,
    cell: ({ row }) => (
      <button
        className="text-red-500"
        title="Delete"
        onClick={() => handleDelete(row.original)}
      >
        <Trash className="w-5 h-5" />
      </button>
    ),
  },
];

const ManageCategories = ({ categories }: TCategoriesProps) => {
  console.log(categories);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      <div className="mt-5">
        <NMTable data={categories} columns={columns} />
      </div>
    </div>
  );
};

export default ManageCategories;
