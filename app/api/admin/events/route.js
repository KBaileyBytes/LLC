import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const event = new Event(body);
    await event.save();

    return new Response(
      JSON.stringify({ message: "Successfully created event", event }),
      {
        status: 201,
      }
    );
  } catch (e) {
    return new Response(`Error: ${e}`, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({}).sort({ date: 1 }); // sort by date ascending
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(`Error: ${e}`, { status: 500 });
  }
}
