// Complete CRUD Example - Multiple HTTP Methods
// Matches: /api/todos
// Demonstrates: GET, POST, PATCH, DELETE, HEAD
// This shows how to handle different HTTP methods on the same route

const todos = [
  { id: 1, title: "Learn React + Vite", completed: false, priority: "high" },
  { id: 2, title: "Build API functions", completed: true, priority: "medium" },
  { id: 3, title: "Deploy to production", completed: false, priority: "low" },
];

let nextId = 4;

// GET - List all todos or filter by status
export async function GET(request) {
  const url = new URL(request.url);
  const completed = url.searchParams.get("completed");
  const priority = url.searchParams.get("priority");

  let filtered = todos;

  if (completed !== null) {
    filtered = filtered.filter((t) => t.completed === (completed === "true"));
  }

  if (priority) {
    filtered = filtered.filter((t) => t.priority === priority);
  }

  return Response.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
}

// POST - Create a new todo
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return Response.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 }
      );
    }

    const newTodo = {
      id: nextId++,
      title: body.title,
      completed: body.completed || false,
      priority: body.priority || "medium",
    };

    todos.push(newTodo);

    return Response.json(
      {
        success: true,
        message: "Todo created",
        data: newTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }
}

// PATCH - Partially update a todo
export async function PATCH(request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return Response.json(
        { success: false, error: "Todo ID is required" },
        { status: 400 }
      );
    }

    const index = todos.findIndex((t) => t.id === parseInt(body.id));

    if (index === -1) {
      return Response.json(
        { success: false, error: "Todo not found" },
        { status: 404 }
      );
    }

    if (body.title !== undefined) todos[index].title = body.title;
    if (body.completed !== undefined) todos[index].completed = body.completed;
    if (body.priority !== undefined) todos[index].priority = body.priority;

    return Response.json({
      success: true,
      message: "Todo updated",
      data: todos[index],
    });
  } catch (error) {
    return Response.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

// DELETE - Remove a todo
export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json(
      { success: false, error: "Todo ID is required" },
      { status: 400 }
    );
  }

  const index = todos.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return Response.json(
      { success: false, error: "Todo not found" },
      { status: 404 }
    );
  }

  const deletedTodo = todos.splice(index, 1)[0];

  return Response.json({
    success: true,
    message: "Todo deleted",
    data: deletedTodo,
  });
}

// HEAD - Return only headers (no body)
export async function HEAD(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Total-Count": String(todos.length),
      "X-Completed-Count": String(todos.filter((t) => t.completed).length),
    },
  });
}
