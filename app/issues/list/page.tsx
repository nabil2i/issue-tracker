import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const assignee = searchParams.assignee;
  const assigneeWhere = assignee ? { assignedToUserId: assignee } : undefined;

  const statuses = Object.values(Status);
  searchParams.status;
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status: status };

  console.log(searchParams.orderBy)
  const isDescending =
  searchParams.orderBy && searchParams.orderBy.startsWith("-");
  console.log(isDescending)
  let orderBy;
  const validOrderBy =
  searchParams.orderBy && searchParams.orderBy.replace(/^-/, "");
  console.log(validOrderBy)
  if (columnNames.includes(validOrderBy as any)) {
    if (!isDescending) orderBy = { [validOrderBy]: "desc" };
    else orderBy = { [validOrderBy]: "asc" };
  } else orderBy = undefined;
  // console.log("orderBy: ", orderBy)

  // const orderBy = columnNames
  //   .includes(searchParams.orderBy)
  //   ? { [searchParams.orderBy]: "asc" }
  //   : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;
  let totalIssues;

  // const issues = assigneeWhere
  // ? await prisma.issue.findMany({
  //     where: {
  //       AND: [
  //         where,
  //         assigneeWhere
  //       ]
  //     },
  //     orderBy,
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //   })
  // : await prisma.issue.findMany({
  //   where,
  //   orderBy,
  //   skip: (page - 1) * pageSize,
  //   take: pageSize,
  // });

  let issues;
  if (assigneeWhere && where) {
    issues = await prisma.issue.findMany({
      where: {
        AND: [where, assigneeWhere],
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    totalIssues = await prisma.issue.count({
      where: {
        AND: [where, assigneeWhere],
      },
    });
  }
  if (!assigneeWhere && where) {
    issues = await prisma.issue.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    totalIssues = await prisma.issue.count({ where });
  }
  if (assigneeWhere && !where) {
    issues = await prisma.issue.findMany({
      where: assigneeWhere,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    totalIssues = await prisma.issue.count({ where: assigneeWhere });
  }

  // const totalIssues = await prisma.issue.count({ where });
  // console.log(totalIssues);

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues!} />
      <Flex justify="center">
        <Pagination
          itemCount={totalIssues!}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
