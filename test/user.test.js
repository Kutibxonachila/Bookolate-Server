import { loginUser, registerUser } from "../src/services/auth.service.js";

test("should user sign up successfully", async () => {
  const mockUserData = {
    first_name: "John",
    last_name: "Doe",
    phone: "+998995554433",
    password: "YesMyFriend)",
    gender: "Male",
  };

  const result = await registerUser(mockUserData);

  expect(result.first_name).toBe("John");
  expect(result.last_name).toBe("Doe");
  expect(result.phone).toBe("+998995554433");
  expect(result.password).toBe("YesMyFriend");
  expect(result.gender).toBe("Male");
});

test("should user sign in successfully", async () => {
  const mockUserData = {
    phone: "+998995554433",
    password: "YesMyFriend",
  };

  const result = await loginUser(mockUserData);

  expect(result.phone).toBe("+998995554433");
  expect(result.password).toBe("YesMyFriend");
});

