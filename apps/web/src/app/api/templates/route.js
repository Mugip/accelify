import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let query;
    if (type && type !== "all") {
      query = sql`
        SELECT * FROM templates 
        WHERE type = ${type}
        ORDER BY created_at DESC
      `;
    } else {
      query = sql`
        SELECT * FROM templates 
        ORDER BY created_at DESC
      `;
    }

    const templates = await query;

    return Response.json({ templates });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return Response.json(
      { error: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}
