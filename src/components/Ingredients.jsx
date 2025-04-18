import React, { useState } from "react";
import { fetchIngredients } from "../utils/api";
import Navbar from "./Navbar";
import "../styles/Ingredients.scss"; // Add styles

const Ingredients = ({ username, setIsAuthenticated }) => {
  const [dish, setDish] = useState("");
  const [servings, setServings] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [procedure, setProcedure] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const data = await fetchIngredients(dish, servings, token);

      if (!data || !data.ingredients || !data.procedure) {
        throw new Error("Invalid response format from server");
      }

      setIngredients(data.ingredients);
      setProcedure(data.procedure);
    } catch (err) {
      setError(err.message || "Failed to fetch recipe details.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar username={username} setIsAuthenticated={setIsAuthenticated} />
      <div className='ingredients-container'>
        <br />
        <h2>Get Ingredients</h2>
        <div className='input-grp'>
          <input
            type='text'
            placeholder='Enter dish name'
            value={dish}
            onChange={(e) => setDish(e.target.value)}
          />
          <input
            type='number'
            placeholder='Servings'
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className='serving-input'
          />
        </div>
        <button onClick={handleFetch} disabled={loading} className='fetch-btn'>
          {loading ? "Loading..." : "Fetch Ingredients"}
        </button>
        <br />
        <br />
        <br />
        {error && <p className='error'>{error}</p>}
        {ingredients.length > 0 && (
          <table className='ingredients-table'>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <hr />
      {procedure && (
        <div className='procedure-container'>
          <h3>Cooking Procedure</h3>
          <p>{procedure}</p>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
