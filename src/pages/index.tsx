import React from "react"
import { graphql } from "gatsby"
import { sampleSize } from "lodash"
import { Typography, Hidden } from "@material-ui/core"
import styled from "@emotion/styled"

import { DrinkDeck } from "../components/DrinkDeck"
import Layout from "../components/layout"
import "../global.css"
import Header from "../components/Header"

const Title = styled("div")`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AMOUNT_DRINKS = 20

const IndexPage = ({
  data: {
    allDrink: { nodes: drinks },
  },
}) => {
  const randomDrinks = sampleSize(drinks, AMOUNT_DRINKS)

  return (
    <>
      <Header />
      <Layout>
        <Hidden smDown>
          <Title>
            <Typography variant="h4" style={{ color: "white" }}>
              Swipe your delicious drink
            </Typography>
          </Title>
        </Hidden>
        <DrinkDeck drinks={randomDrinks} />
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query CocktailQuery {
    allDrink {
      nodes {
        idDrink
        strDrink
        strDrinkThumb
        strAlcoholic
        strCategory
        strGlass
        strIngredient1
        strIngredient2
        strIngredient3
        strIngredient4
        strIngredient5
        strIngredient6
        strIngredient7
        strIngredient8
        strIngredient9
        strIngredient10
        strIngredient11
        strIngredient12
        strInstructions
      }
    }
  }
`

export default IndexPage
