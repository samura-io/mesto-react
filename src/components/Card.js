function Card(props){

    const handleClick = () => {
        props.onCardClick(props.card);
      } 

    return (
        <div>
            <article className="card" onClick={handleClick}>
            <img className="card__image" alt={props.card.name} src={props.card.link} />
            <button className="card__trash" type="button" aria-label="Удалить"></button>
            <div className="card__container">
                <h2 className="card__name">{props.card.name}</h2>
                <button className="card__like-button" type="button" aria-label="Нравится"></button>
                <span className="card__like-counter">0</span>
            </div>
            </article>
        </div>
    )
}

export default Card