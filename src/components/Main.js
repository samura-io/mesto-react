import api from "../utils/Api"
import React from "react";
import Card from "./Card.js"

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])

    React.useEffect(()=>{
      api.getUserInfo().then((res)=>{
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
      .catch((err)=>{
        console.log(err)
      })
      
      api.getInitialCards().then((res)=>{
        setCards(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])

    return (
        <main className="main">
          <section className="profile">
            <div className="profile__edit-img" onClick={props.onEditAvater}>
              <img className="profile__img" src={userAvatar} alt="Изображение профиля" />
            </div>
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__button profile__edit-button" 
              type="button" aria-label="Редактировать" 
              onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__profession">{userDescription}</p>
            <button className="profile__button profile__add-button" type="button" 
            aria-label="Добавить изображение"
            onClick={props.onAddPlace}></button>
          </section>
          <section className="cards">
            {cards.map((card)=> (
              <Card 
              key= {card._id}
              card={card} 
              onCardClick = {props.onCardClick}/>
            ))}
          </section>
        </main>
    )
}

export default Main