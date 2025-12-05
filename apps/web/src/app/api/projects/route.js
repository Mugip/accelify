import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const projects = await sql`
      SELECT p.*, 
             json_build_object(
               'scripts', COALESCE(o.scripts, '[]'::jsonb),
               'posts', COALESCE(o.posts, '[]'::jsonb),
               'clips', COALESCE(o.clips, '[]'::jsonb)
             ) as outputs
      FROM projects p
      LEFT JOIN outputs o ON o.project_id = p.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `;

    return Response.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
