import React, { useState } from "react"
import { Container, Typography } from "@material-ui/core"
import "../global.css"
import Header from "../components/Header"
import { getDrinks, removeDrink } from "../lib/drinksCache"
import { CocktailCard } from "../components/DrinkDeck"

const MyDrinks = () => {
  const [drinks, setDrinks] = useState(getDrinks)
  const onRemove = (id: string) => {
    removeDrink(id)
    const newDrinks = drinks.filter(drink => drink.idDrink !== id)
    setDrinks(newDrinks)
  }
  const hasDrinks = drinks.length > 0
  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        style={{ backgroundColor: "black", height: "100vh" }}
      >
        {hasDrinks &&
          drinks.map(drink => (
            <CocktailCard
              key={drink.idDrink}
              drink={drink}
              onRemove={onRemove}
            />
          ))}
        {!hasDrinks && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Typography style={{ color: "white" }}>
              No drinks. Please swipe some delicious drinks :)
            </Typography>
          </div>
        )}
      </Container>
    </>
  )
}

export default MyDrinks
