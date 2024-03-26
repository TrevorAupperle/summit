import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "~/components/shadcn/ui/button";
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

  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [events, setEvents] = useState<Event[]>([]);

  const handleViewChange = (newView: "day" | "week" | "month") => {
    setView(newView);
  };

  const handleEventCreation = (start: Date, end: Date) => {
    // Logic to create new event
    // You can add it to the events state
  };

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
        <div className="bg-gray-100 p-4">
          <div className="mb-4 flex justify-center space-x-4">
            <Button onClick={() => handleViewChange("day")}>Day</Button>
            <Button onClick={() => handleViewChange("week")}>Week</Button>
            <Button onClick={() => handleViewChange("month")}>Month</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7 lg:grid-cols-5">
            {/* Render calendar grid based on selected view */}
            {/* You can use conditional rendering based on the `view` state */}
            {/* Implement logic to render day, week, month view */}
            {/* You can add event creation functionality in the day view */}
            {/* e.g., onClick and drag to create event */}
          </div>
        </div>

        <div className="flex flex-col">Hello</div>
      </div>
    </>
  );
}
