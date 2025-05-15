import { client } from "@/config/NilePostgresConfig";

// Add a comment
export async function POST(request: Request) {
  const { postId, userEmail, content } = await request.json();
  await client.connect();

  const result = await client.query(`
    INSERT INTO comments (post_id, user_email, content)
    VALUES (${postId}, '${userEmail}', '${content}')
    RETURNING *;
  `);

  await client.end();
  return Response.json(result.rows[0]);
}

// Get comments for a post
export async function GET(request: Request) {
  const postId = new URL(request.url).searchParams.get("postId");
  await client.connect();

  const result = await client.query(`
    SELECT comments.*, users.name, users.image
    FROM comments
    JOIN users ON comments.user_email = users.email
    WHERE post_id = ${postId}
    ORDER BY commented_at DESC;
  `);

  await client.end();
  return Response.json(result.rows);
}
