/** Card: presentational component of single card from deck
 *
 *  Props: name, image
 *
 *  State: none
 *
 *  Deck -> Card
 */

function Card({ name, image }) {
  return (
    <div className="Card">
      <img
        className="Card-img"
        alt={name}
        src={image}
      />
    </div>
  )
}


export default Card;