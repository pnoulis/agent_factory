import { describe, it, expect } from "vitest";

/*
  TESTING COMPONENTS
 */

import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

describe("Admin signup", () => {
  it("should signup an administrator", async () => {
    await expect(
      bservice.signupAdmin({
        timestamp: Date.now(),
        username: "pavlos",
        email: "one@gmail.com",
        password: "123",
        role: ["ROLE_CASHIER"],
      }),
    );
  });
});
