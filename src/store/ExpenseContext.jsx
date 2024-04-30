import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "./expense-slice";

const ExpenseContext = React.createContext({
  expenses: [],
  fetchExpense: () => {},
  addExpense: () => {},
  updateExpense: () => {},
  removeExpense: () => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenseItems, setExpenseItems] = useState([]);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email)?.replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const api = "https://react-authentication--app-default-rtdb.firebaseio.com/";

  useEffect(() => {
    fetchExpenseHandler();
  }, [userEmail]);

  const fetchExpenseHandler = async () => {
    try {
      if (userEmail) {
        const url = `${api}/expenses/${userEmail}.json`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch expense data");
        }

        const data = await response.json();
        const expenseList = Object.keys(data || {}).map((expenseId) => ({
          id: expenseId,
          ...data[expenseId],
        }));

        dispatch(expenseActions.setItems(expenseList));
        setExpenseItems(expenseList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExpenseHandler = async (item) => {
    try {
      if (userEmail) {
        const url = `${api}/expenses/${userEmail}.json`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });

        if (!response.ok) {
          throw new Error("Error adding/updating item");
        }

        const data = await response.json();
        item = { ...item, id: data.name };

        setExpenseItems((prevItems) => [...prevItems, item]);
        dispatch(expenseActions.addItem(item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpenseHandler = async (updatedExpense) => {
    try {
      if (userEmail) {
        const url = `${api}/expenses/${userEmail}/${updatedExpense.id}.json`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        });

        if (!response.ok) {
          throw new Error("Error updating item");
        }

        setExpenseItems((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedExpense.id ? updatedExpense : item
          )
        );

        dispatch(expenseActions.editItem({ item: updatedExpense }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeExpenseHandler = async (expenseId) => {
    try {
      if (userEmail) {
        const url = `${api}/expenses/${userEmail}/${expenseId}.json`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error deleting item");
        }

        setExpenseItems((prevItems) =>
          prevItems.filter((item) => item.id !== expenseId)
        );
        dispatch(expenseActions.removeItem({ id: expenseId }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const expenseContext = {
    expenses: expenseItems,
    fetchExpense: fetchExpenseHandler,
    addExpense: addExpenseHandler,
    updateExpense: updateExpenseHandler,
    removeExpense: removeExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
