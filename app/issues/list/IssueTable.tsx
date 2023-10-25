import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowLeftIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  pageSize: string;
  assignee: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const isDescending = searchParams.orderBy && searchParams.orderBy.startsWith("-");
  // console.log("isDescending: ", isDescending);
  const defaultOrderBy = "title";

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    // query: { ...searchParams, orderBy: column.value },
                    query: {
                      ...searchParams,
                      orderBy: isDescending
                        ? column.value
                        : `-${column.value}`,
                    },
                  }}
                >
                  {column.label}
                </NextLink>             
                {searchParams.orderBy && column.value === searchParams.orderBy.replace(/^-/, "") && (
                  isDescending ? <ArrowDownIcon className="inline" /> : <ArrowUpIcon className="inline" />
                )}              
                {column.value === defaultOrderBy && !searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
                {searchParams.orderBy && column.value !== searchParams.orderBy.replace(/^-/, "") && (
                  <ArrowLeftIcon className="inline" /> // Display horizontal arrow for non-active columns
                )}
                {/* {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )} */}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
