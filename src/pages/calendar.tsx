import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import TextField from "~/components/TextField";

export default function Calendar() {
  const router = useRouter();

  // Checks if the user is authenticated, if not, redirects to the signin page
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      void router.push("/api/auth/signin");
    },
  });

  const [organizationJoinCode, setOrganizationJoinCode] = useState("");

  // If the session is loading, we display a loading message
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex w-full flex-grow flex-col gap-4 rounded-md border border-gray-300 bg-white px-8 py-4">
        <div className="flex flex-col border-b border-gray-300 pb-4">
          <h3 className="text-xl font-semibold text-summit-700">
            Calendar Page
          </h3>
        </div>

        <div className="flex flex-col">Hello</div>
      </div>
    </>
  );
}
