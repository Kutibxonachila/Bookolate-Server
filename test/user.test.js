import { loginUser, registerUser } from "../src/services/auth.service.js";

test("should user sign up successfully", async () => {
  const mockUserData = {
    first_name: "John",
    last_name: "Doe",
    phone: "+998995554433",
    password: "YesMyFriend)",
    gender: "Male",
  };

  // Simulate user registration
  const result = await registerUser(mockUserData);

  expect(result.first_name).toBe("John");
  expect(result.last_name).toBe("Doe");
  expect(result.phone).toBe("+998995554433");
  expect(result.gender).toBe("Male");
  // Do not expect the password to be returned directly for security reasons
  expect(result.password).not.toBe(mockUserData.password);
});

test("should user sign in successfully", async () => {
  const mockUserData = {
    phone: "+998995554433",
    password: "YesMyFriend)",
  };

  // Simulate user login
  const result = await loginUser(mockUserData);

  expect(result.phone).toBe("+998995554433");
  expect(result.password).not.toBe(mockUserData.password); // Ensure password is not directly returned (hashed password should be used)
});
