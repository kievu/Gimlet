import lscache from "lscache"

const DRINKS_KEYS = "drinks"

export function addDrink(drink: Object) {
  // Make sure we don't add the same drink multiple times
  if (isNotDuplicate(drink.idDrink)) {
    const drinks = [drink, ...getDrinks()]
    setDrinks(drinks)
  }
}

export function removeDrink(id: string) {
  const drinks = getDrinks().filter(x => x.idDrink !== id)
  setDrinks(drinks)
}

export function isNotDuplicate(id: string) {
  return getDrinks().every(drink => drink.idDrink !== id)
}

export function getDrinks(): Array<Object> {
  return lscache.get(DRINKS_KEYS) || []
}

export function clearDrinks() {
  lscache.remove(DRINKS_KEYS)
}

function setDrinks(drinks: Array<Object>) {
  lscache.set(DRINKS_KEYS, drinks)
}
