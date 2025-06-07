import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SK,
});

export async function POST(request) {
  // Get the current user from your database
  const user = await currentUser();

  // Get room from URL parameters instead of request body
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("roomId");

  // Check if room exists and is valid
  if (!room || room === "undefined") {
    return new Response("Room ID is required", { status: 400 });
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user?.primaryEmailAddress?.emailAddress
  );

  // Fix: Remove optional chaining from FULL_ACCESS
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
