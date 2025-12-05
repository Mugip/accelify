import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const projects = await sql`
      SELECT * FROM projects WHERE id = ${id}
    `;

    if (projects.length === 0) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    const outputs = await sql`
      SELECT * FROM outputs WHERE project_id = ${id}
    `;

    return Response.json({
      project: projects[0],
      outputs: outputs[0] || null,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return Response.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
