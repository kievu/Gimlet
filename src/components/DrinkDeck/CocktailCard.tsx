import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Collapse,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import CloseIcon from "@material-ui/icons/Close"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 345,
    marginBottom: 30,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}))

const CocktailCard = ({ drink, onRemove }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const ingredients = []
  for (let [key, value] of Object.entries(drink)) {
    if (key.startsWith("strIngredient") && !!value) ingredients.push(value)
  }

  return (
    <Card className={classes.card}>
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
      <CardMedia image={drink.strDrinkThumb} className={classes.media} />
      <CardActions disableSpacing>
        <IconButton
          className={expanded ? classes.expandOpen : classes.expand}
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

export default CocktailCard
