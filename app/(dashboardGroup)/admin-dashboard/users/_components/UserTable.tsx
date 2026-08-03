"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { deleteUser, updateUserStatus } from "../_actions/userActions";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

interface Props {
  users: User[];
}

export default function UserTable({
  users,
}: Props) {
  const router = useRouter();

  const handleStatus = async (
    id: string,
    status: string
  ) => {
    const result = await updateUserStatus(
      id,
      status
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  const handleDelete = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete this user?"
    );

    if (!ok) return;

    const result = await deleteUser(id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Phone</TableHead>

            <TableHead>Role</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>
                {user.phone}
              </TableCell>

              <TableCell>
                {user.role}
              </TableCell>

              <TableCell>
                <Select
                  defaultValue={user.status}
                  onValueChange={(value) =>
                    handleStatus(
                      user.id,
                      value as string
                    )
                  }
                >
                  <SelectTrigger className="w-30">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="ACTIVE">
                      ACTIVE
                    </SelectItem>

                    <SelectItem value="BLOCKED">
                      BLOCKED
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    handleDelete(user.id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center"
              >
                No Users Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}