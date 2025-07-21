import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectToDatabase();

    const event = await Event.findById(id);

    if (!event) {
      return new Response("Event not found", { status: 404 });
    }

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Fetch error:", e);
    return new Response(`Error: ${e.message || e}`, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  try {
    await connectToDatabase();

    const updatedEvent = await Event.findByIdAndUpdate(id, body, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validation
    });

    if (!updatedEvent) {
      return new Response("Event not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedEvent), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Update error:", e);
    return new Response(`Error: ${e.message || e}`, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  await connectToDatabase();

  try {
    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) {
      return new Response("Event not found", { status: 404 });
    }

    return new Response("Successfully deleted event", { status: 200 });
  } catch (error) {
    return new Response(`Error deleting event: ${error}`, { status: 500 });
  }
}
