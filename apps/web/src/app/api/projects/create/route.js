import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, inputUrl } = body;

    if (!type || !inputUrl) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const projects = await sql`
      INSERT INTO projects (type, input_url, status, user_id)
      VALUES (${type}, ${inputUrl}, 'processing', 1)
      RETURNING *
    `;

    const project = projects[0];

    processProjectAsync(project.id, type, inputUrl);

    return Response.json({ project });
  } catch (error) {
    console.error("Error creating project:", error);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}

async function processProjectAsync(projectId, type, inputUrl) {
  try {
    const prompt = `You are an AI content repurposing assistant. 
    
A user has submitted a ${type} from this URL: ${inputUrl}

Generate the following:
1. 5-10 short-form video scripts (7-15 seconds each) suitable for TikTok/Instagram Reels
2. 10-15 social media posts optimized for different platforms
3. An SEO-optimized summary of the content
4. 5-10 content ideas with viral hook potential

Return structured JSON data.`;

    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are an AI content repurposing expert.",
          },
          { role: "user", content: prompt },
        ],
        json_schema: {
          name: "content_repurpose",
          schema: {
            type: "object",
            properties: {
              scripts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    text: { type: "string" },
                    duration: { type: "string" },
                    hook: { type: "string" },
                  },
                  required: ["text", "duration", "hook"],
                  additionalProperties: false,
                },
              },
              posts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    platform: { type: "string" },
                    content: { type: "string" },
                    hashtags: { type: "string" },
                  },
                  required: ["platform", "content", "hashtags"],
                  additionalProperties: false,
                },
              },
              seoSummary: { type: "string" },
            },
            required: ["scripts", "posts", "seoSummary"],
            additionalProperties: false,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("AI processing failed");
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    await sql`
      INSERT INTO outputs (project_id, scripts, posts, seo_summary)
      VALUES (${projectId}, ${JSON.stringify(result.scripts)}, ${JSON.stringify(result.posts)}, ${result.seoSummary})
    `;

    await sql`
      UPDATE projects SET status = 'completed' WHERE id = ${projectId}
    `;
  } catch (error) {
    console.error("Error processing project:", error);
    await sql`
      UPDATE projects SET status = 'failed' WHERE id = ${projectId}
    `;
  }
}
