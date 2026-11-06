// Dynamic Route Example - Single Parameter
// Matches: /api/users/:id
// Examples:
//   /api/users/1 -> id = "1"
//   /api/users/123 -> id = "123"
//   /api/users/abc -> id = "abc"

const users = {
  1: { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  2: { id: 2, name: "Bob", email: "bob@example.com", role: "user" },
  3: { id: 3, name: "Charlie", email: "charlie@example.com", role: "user" },
};

export async function GET(request) {
  const { id } = request.params;

  console.log(`GET /api/users/${id}`);

  const user = users[id];

  if (!user) {
    return Response.json(
      {
        success: false,
        error: "User not found",
        id: id,
      },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    data: user,
  });
}

export async function PUT(request) {
  const { id } = request.params;

  console.log(`PUT /api/users/${id}`);

  const user = users[id];

  if (!user) {
    return Response.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  const body = await request.json();

  users[id] = { ...user, ...body, id: parseInt(id) };

  return Response.json({
    success: true,
    message: "User updated",
    data: users[id],
  });
}

export async function DELETE(request) {
  const { id } = request.params;

  console.log(`DELETE /api/users/${id}`);

  const user = users[id];

  if (!user) {
    return Response.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  delete users[id];

  return Response.json({
    success: true,
    message: "User deleted",
    data: user,
  });
}
