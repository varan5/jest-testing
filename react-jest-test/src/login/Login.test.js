
import { fireEvent, render, screen } from '@testing-library/react'
import Login from './Login'
import { MemoryRouter } from 'react-router-dom';
jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));
test('userName input should be rendered', () => {

  render(<Login />, { wrapper: MemoryRouter })
  const userNameInput = screen.getByLabelText(/username/i)
  expect(userNameInput).toBeInTheDocument()

})
test('password input should be rendered', () => {

  render(<Login />, { wrapper: MemoryRouter })
  const passwordInput = screen.getByLabelText(/password/i)
  expect(passwordInput).toBeInTheDocument()

})
test('login button should be rendered', () => {

  render(<Login />, { wrapper: MemoryRouter })
  const loginButton = screen.getByRole("button")
  expect(loginButton).toBeInTheDocument()

})
test('userName input should change', () => {

  render(<Login />, { wrapper: MemoryRouter })
  const userNameInput = screen.getByLabelText(/username/i)
  const testValue = 'test'
  fireEvent.change(userNameInput, { target: { value: testValue } })
  expect(userNameInput.value).toBe(testValue)

})
test('password input should change', () => {

  render(<Login />, { wrapper: MemoryRouter })
  const passwordInput = screen.getByLabelText(/password/i)
  const testValue = 'test'
  fireEvent.change(passwordInput, { target: { value: testValue } })
  expect(passwordInput.value).toBe(testValue)

})
test("user should be rendered after fetching", async () => {
  render(<Login />, { wrapper: MemoryRouter })
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByLabelText(/username/i);
  const passwordInputEl = screen.getByLabelText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
let cities = [];

function initializeFoodDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities[0].foods = ["Wiener Schnitzel"];
      cities[1].foods = ["Mofongo"];
      resolve();
    }, 100);
  });
}
function isValidCityFoodPair(name, food) {
  const city = cities.find(city => city.name === name);

  if (!city || !city.foods) {
    return false;
  }

  return city.foods.includes(food);
}



function initializeCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities.push({ name: "Vienna" });
      cities.push({ name: "San Juan" });
      resolve();
    }, 100);
  });
}
function clearCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities = [];
      resolve();
    }, 100);
  });
}

function isCity(name) {
  return cities.map(city => city.name).includes(name);
}



beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

test("has only 2 cities", () => {
  expect(cities.length).toBe(2);
});

describe("matching cities to foods", () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test("Vienna <3 sausage", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});