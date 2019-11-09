import React, { useState } from "react"
import {
  Container,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Collapse,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import "../global.css"
import Header from "../components/Header"
import { getDrinks, removeDrink } from "../lib/drinksCache"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import CloseIcon from "@material-ui/icons/Close"

const CocktailCard = ({ drink, onRemove }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const ingredients = []
  for (let [key, value] of Object.entries(drink)) {
    if (key.startsWith("strIngredient") && !!value) ingredients.push(value)
  }

  return (
    <Card
      key={drink.idDrink}
      css={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 345,
        marginBottom: 30,
      }}
    >
      <CardHeader
        title={drink.strDrink}
        subheader={drink.strCategory}
        action={
          <IconButton
            aria-label="remove cocktail"
            onClick={() => onRemove(drink.idDrink)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardMedia
        image={drink.strDrinkThumb}
        css={{
          height: 0,
          paddingTop: "56.25%",
        }}
      />

      {/* <div>
                  <IconButton onClick={() => onRemove(drink.idDrink)}>
                    <DeleteIcon style={{ fontSize: 30 }} />
                  </IconButton>
                </div> */}
      <CardActions disableSpacing>
        <IconButton
          css={{ marginLeft: "auto" }}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" paragraph>
            Ingredients:
          </Typography>
          <ul>
            {ingredients.map((el, index) => (
              <Typography key={index} component="li">
                {el}
              </Typography>
            ))}
          </ul>
          <Typography variant="h6" paragraph>
            Method:
          </Typography>
          <Typography>{drink.strInstructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

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
