const user = {
  type: "object",
  properties: {
    username: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
  },
};

export { user };
