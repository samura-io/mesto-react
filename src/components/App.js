import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForms from "./PopupWithForm";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState()

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(()=>{
    
  })

  return (
    <div className="App">
      <Header />
      <Main 
      onEditAvater={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick = {handleCardClick}
      />
      <Footer />

      {/* Попап редактирования аватара */}
      <PopupWithForms 
      isOpen={isEditAvatarPopupOpen}
      isClose = {closeAllPopups}
      name = 'avatar'
      title = 'Обновить аватар'
      children={
        <>
          <input className="popup__input popup__input_value_avatar" type="url" defaultValue="" placeholder="Ссылка на изображение" 
              name="avatar" id="avatar" required />
          <span className="popup__input-error avatar-error"></span>
          <button type="submit" className="popup__save-button" aria-label="Сохранить">Сохранить</button>
        </>
      }/>

      {/* Попап редактирования профиля */}
      <PopupWithForms 
      isOpen={isEditProfilePopupOpen}
      isClose = {closeAllPopups}
      name = 'Profile'
      title = 'Редактировать профиль'
      children={
        <>
          <input className="popup__input popup__input_value_name" type="text" required defaultValue="" 
              placeholder="Имя" name="username" id="username" minLength="2" maxLength="40" />
          <span className="popup__input-error username-error"></span>
              
          <input className="popup__input popup__input_value_profession" type="text" required defaultValue="" 
              placeholder="О себе" name="profession" id="profession"  minLength="2" maxLength="200" />
          <span className="popup__input-error profession-error"></span>
            
          <button type="submit" className="popup__save-button" aria-label="Сохранить">Сохранить</button>
        </>
      }/>

      {/* Попап добавления карточек */}
      <PopupWithForms 
      isOpen={isAddPlacePopupOpen}
      isClose = {closeAllPopups}
      name = 'Place'
      title = 'Новое место'
      children={
        <>
          <input className="popup__input popup__input_value_place" type="text" defaultValue=""
              placeholder="Название" name="name" minLength="2" maxLength="30" id="name" required />
          <span className="popup__input-error name-error"></span>
              
          <input className="popup__input popup__input_value_link" type="url" defaultValue="" placeholder="Ссылка на картинку" 
              name="link" id="link" required />
              <span className="popup__input-error link-error"></span>
              
          <button type="submit" className="popup__save-button" aria-label="Создать">Создать</button>
        </>
      }/>
      {/* Попап с картинкой */}
      <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups} />
    </div>
  );
}

export default App;