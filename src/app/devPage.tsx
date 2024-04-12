import { toPlainObject } from "lodash";
import Link from "next/link";

import { Debug } from "@/components/devtool/debug";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import {env} from "@/env";

export async function DevPage() {
  const session = await getServerAuthSession();

  return (
    <div className={"h-dvh bg-gray-200 p-4"}>
      <div
        className={
          "grid grid-cols-2 rounded-xl border-2 border-dashed bg-gray-50 p-8"
        }
      >
        <div className={"grid content-start gap-4"}>
          <h1 className={"text-xl"}>Peoplez</h1>
          <p className={"text-md text-gray-800"}>
            This page is only displayed on dev environment, in production a
            landing page with some marketing material will be displayed
          </p>

          <div className={"flex gap-2"}>
            <Link href={"/signup"}>
              <Button>SignUp</Button>
            </Link>
            <Link href={"/members"}>
              <Button>Member Portal</Button>
            </Link>
            <Link href={"/admin"}>
              <Button>Admin Portal</Button>
            </Link>
          </div>

          <Debug title={"session"}>{session}</Debug>
        </div>

        <div className={"grid overflow-auto"}>
          <Debug title={"env"}>{toPlainObject(env)}</Debug>
        </div>
      </div>
    </div>
  );
}
