import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const posts = await sql`
      SELECT * FROM scheduled_posts
      ORDER BY scheduled_time ASC
      LIMIT 50
    `;

    return Response.json({ posts });
  } catch (error) {
    console.error("Error fetching scheduled posts:", error);
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
