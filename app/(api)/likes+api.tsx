import { client } from "@/config/NilePostgresConfig";

// Add a like (requires both postId and userId)
export async function POST(request: Request) {
  const { postId, userId } = await request.json();

  if (!postId || !userId) {
    return new Response("Both postId and userId are required", { status: 400 });
  }

  try {
    await client.connect();
    
    const result = await client.query(
      `INSERT INTO likes (post_id, user_id)
       VALUES ($1, $2)
       ON CONFLICT (post_id, user_id) DO NOTHING
       RETURNING *;`, 
      [postId, userId]
    );

    return Response.json(result.rows[0] || { message: "Like already exists" });
  } catch (error) {
    console.error("Error adding like:", error);
    return new Response("Failed to add like", { status: 500 });
  } finally {
    await client.end();
  }
}

// Get like count for a post
export async function GET(request: Request) {
  const postId = new URL(request.url).searchParams.get("postId");

  if (!postId) {
    return new Response("Post ID is required", { status: 400 });
  }

  try {
    await client.connect();

    const result = await client.query(
      `SELECT COUNT(*) as like_count FROM likes WHERE post_id = $1;`, 
      [postId]
    );

    return Response.json({ likeCount: parseInt(result.rows[0].like_count, 10) });
  } catch (error) {
    console.error("Error fetching like count:", error);
    return new Response("Failed to get like count", { status: 500 });
  } finally {
    await client.end();
  }
}

// Additional endpoint to check if a specific user has liked a post
export async function HEAD(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");
  const userId = url.searchParams.get("userId");

  if (!postId || !userId) {
    return new Response("Both postId and userId are required", { status: 400 });
  }

  try {
    await client.connect();

    const result = await client.query(
      `SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2 LIMIT 1;`,
      [postId, userId]
    );

    return new Response(null, { 
      status: result.rows.length ? 200 : 404 
    });
  } catch (error) {
    console.error("Error checking like:", error);
    return new Response("Failed to check like status", { status: 500 });
  } finally {
    await client.end();
  }
}