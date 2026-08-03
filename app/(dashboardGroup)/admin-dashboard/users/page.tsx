

import { getAllUsers } from "./_actions/userActions";
import UserTable from "./UserTable";

export default async function UsersPage() {
  const result = await getAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <p className="text-muted-foreground">
          Manage all registered users
        </p>
      </div>

      <UserTable users={result.data} />
    </div>
  );
}