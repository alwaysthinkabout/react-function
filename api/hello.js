// Static Route Example
// Matches: /api/hello
// This is the simplest routing type - exact path match

export async function GET(request) {
  return Response.json({
    message: "Hello from React + Vite + Functions!",
    route: "/api/hello",
    routeType: "static",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));

  return Response.json({
    message: "POST request received",
    receivedData: body,
    timestamp: new Date().toISOString(),
  });
}
