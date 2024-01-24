import { useEffect, useState } from "react";
import Card from "./Card";

const CARDS_API_BASE_URL = `https://deckofcardsapi.com/api/deck/`;


/** Deck: logical component getting deck from Deck of Cards API
 *
 *  State:
 *  - deck: null
 *  - drawn: an array of drawn cards
 *
 *  Prop:
 *  - none
 *
 *  App -> Deck -> Card
*/

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  console.log('Deck component - deck, draw: ', deck, drawn);

  useEffect(function fetchDeckOnMount() {
    async function fetchDeck() {
      try {
        const resp = await fetch(
          `${CARDS_API_BASE_URL}/new/shuffle/?deck_count=1`
        );
        const deckResult = await resp.json();
        setDeck(deckResult);
      } catch (err) {
        console.log('fetchDeck error: ', err);
        setDeck({ errors: err });
      }
    }
    fetchDeck();
  }, []);


  /** Draw card from API using deck ID and update state */

  async function draw() {
    try {
      const resp = await fetch(`${CARDS_API_BASE_URL}/${deck.deck_id}/draw/`);
      const deckData = await resp.json();

      setDeck(deckData);

      if (deckData.remaining <= 0) throw new Error("Deck out of cards!");

      const card = deckData.cards[0];

      setDrawn(currDrawn => [
        ...currDrawn,
        {
          id: card.code,
          name: `${card.value} of ${card.suit}`,
          image: card.image,
        },
      ]);
    } catch (err) {
      console.log(`draw err: `, err);
    }
  }


  /** Render draw button if fetching new deck on mount is good */
  function renderDrawBtnIfGood() {
    if (!deck) return null;

    return (
      <button onClick={draw}>Draw Card</button>
    );
  }


  return (
    <div className="Deck">
      {renderDrawBtnIfGood()}

      <div className="Deck-card-area">
        {drawn.map(c => (
          <Card key={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </div>
  )


}


export default Deck;