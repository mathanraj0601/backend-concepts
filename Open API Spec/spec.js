module.exports = {
  openapi: "3.0.1", // Choose the appropriate version (consider 3.x.y for modern APIs)
  info: {
    title: "Fullname API",
    version: "1.0.0",
    description: "API to concatenate first and last name into a full name",
  },
  paths: {
    "/fullname": {
      get: {
        summary: "Get full name",
        description:
          "Concatenates `fname` and `lname` query parameters into a full name.",
        parameters: [
          {
            in: "query",
            name: "fname",
            required: true,
            schema: {
              type: "string",
            },
            description: "First name",
          },
          {
            in: "query",
            name: "lname",
            required: true,
            schema: {
              type: "string",
            },
            description: "Last name",
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved full name",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        fullname: {
                          type: "string",
                          example: "JohnDoe",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description:
              "Bad request. Both `fname` and `lname` are required query parameters.",
          },
        },
      },
    },
  },
};
