import {describe, it, render, expect,screen} from "vitest";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import ProfileForm from "./components/Profile/ProfileForm";
import MainNavigation from "./components/Layout/MainNavigation";

describe("Expense Tracker Component", () => {
  it("renders Money Spent as a test", () => {
    render(<ExpenseTracker />);
    const moneySpentElement = screen.getByText("Money Spent:");
    expect(moneySpentElement).toBeInTheDocument();
  });

  it("renders Description as a test", () => {
    render(<ExpenseTracker />);
    const descriptionElement = screen.getByText("Description:");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders Category as a test", () => {
    render(<ExpenseTracker />);
    const categoryElement = screen.getByText("Category:");
    expect(categoryElement).toBeInTheDocument();
  });
});

describe("Profile Form Component", () => {
  it("renders Full Name as a test", () => {
    render(<ProfileForm />);
    const fullNameElement = screen.getByText("Full Name");
    expect(fullNameElement).toBeInTheDocument();
  });

  it("renders Profile Photo URL as a test", () => {
    render(<ProfileForm />);
    const profilePhotoElement = screen.getByText("Profile Photo URL");
    expect(profilePhotoElement).toBeInTheDocument();
  });
});

describe("Main Navigation Component", () => {
  it("renders Expense Tracker Logo as a test", () => {
    render(<MainNavigation />);
    const expenseTrackerLogoElement = screen.getByText("Expense Tracker");
    expect(expenseTrackerLogoElement).toBeInTheDocument();
  });
});
