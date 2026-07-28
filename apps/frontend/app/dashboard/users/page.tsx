import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import UsersTable from "./user-table/index";

function UserPage() {
  return (
    <div className="flex h-full w-full items-start justify-center">
      <Card className="flex flex-1 dark:bg-zinc-600/20">
        <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default UserPage;
