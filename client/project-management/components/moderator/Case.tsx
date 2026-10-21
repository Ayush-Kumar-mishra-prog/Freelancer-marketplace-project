"use client";
import { useMemo, useState } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationCardMinimal } from "@/untitledui/application/pagination/pagination";
import { Table, TableCard } from "@/untitledui/application/table/table";
import teamMembers from "@/untitledui/application/table/team-members.json";
import { Avatar } from "@/untitledui/base/avatar/avatar";
import type { BadgeTypes } from "@/untitledui/base/badges/badge-types";
import {
  Badge,
  type BadgeColor,
  BadgeWithDot,
} from "@/untitledui/base/badges/badges";
import { ButtonUtility } from "@/untitledui/base/buttons/button-utility";
import { Button } from "@/untitledui/base/buttons/button";
import DialogBox from "@/shared/Dialog";
// import { DropdownIconSimple } from "@/untitledui/base/dropdown/dropdown-icon-simple";

export const Case = () => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "status",
    direction: "ascending",
  });

  const dummyProject = [
    
    {
      id: 1,
      name: "Alis parry",
      to: "Mohan das",
      date: "20-3-49",
      reason: "",
      status:"active",
      role:"freelancer",
      reportedRole:"client"
    },
  ];

  const sortedItems = useMemo(() => {
    return teamMembers.items.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];

      // Compare numbers or booleans
      if (
        (typeof first === "number" && typeof second === "number") ||
        (typeof first === "boolean" && typeof second === "boolean")
      ) {
        return sortDescriptor.direction === "descending"
          ? second - first
          : first - second;
      }

      // Compare strings
      if (typeof first === "string" && typeof second === "string") {
        let cmp = first.localeCompare(second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }

      return 0;
    });
  }, [sortDescriptor]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableCard.Root size="sm" className="mt-10 ">
      <TableCard.Header title="Team members" badge="100 users" />

      <Table
        aria-label="Team members"
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <Table.Header>
          <Table.Head
            id="name"
            label="Name"
            isRowHeader
            allowsSorting
            className="w-full max-w-1/4"
          />
          <Table.Head id="status" label="Status" allowsSorting />
          <Table.Head
            id="date"
            label="Date"
            allowsSorting
            tooltip="This is a tooltip"
          />
          <Table.Head
            id="toName"
            label="Reported to"
            allowsSorting
            className="md:hidden xl:table-cell"
          />
          <Table.Head
            id="dis"
            label="Report  discription"
            allowsSorting
            className="md:hidden xl:table-cell"
          />
          <Table.Head
            id="reportedRole"
            label="Reported to role"
            allowsSorting
            className="md:hidden xl:table-cell"
          />
          <Table.Head
            id="role"
            label="Reported by role"
            allowsSorting
            className="md:hidden xl:table-cell"
          />
          
          <Table.Head id="actions" label="Actions" />
        </Table.Header>

        <Table.Body items={dummyProject}>
          {(item) => (
            <Table.Row id={item.name}>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <Avatar
                    src={item.name.charAt(0).toUpperCase()}
                    alt={item.name}
                    size="sm"
                  />
                  <p className="text-sm font-medium whitespace-nowrap text-purple-600">
                    {item.name}
                  </p>
                </div>
              </Table.Cell>
              <Table.Cell>
                <BadgeWithDot
                  size="sm"
                  color={item.status === "active" ? "success" : "gray"}
                  type="modern"
                >
                  {item.status === "active" ? "Active" : "Inactive"}
                </BadgeWithDot>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">{item.date}</Table.Cell>
              <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">
                {item.to}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">
                <Button className="bg-green-500">View</Button>
                
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">
                {item.role}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">
                {item.reportedRole}
              </Table.Cell>
              
              <Table.Cell className="">
                <Button className="bg-purple-500">View</Button>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <PaginationCardMinimal
        align="right"
        page={1}
        total={10}
        className="px-4 py-3 md:px-5 md:pt-3 md:pb-4"
      />

      {open ? (
        <DialogBox
          heading={"Edit this project"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto deserunt cumque nesciunt esse, repellat culpa?"
          }
          value={open}
          onClose={handleClose}
        />
      ) : (
        ""
      )}
    </TableCard.Root>
  );
};
