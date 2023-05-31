import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from "./ImagePopup.js";
import api from '../utils/Api'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCardsContext } from "../contexts/InitialCardsContext";
import PopupDeleteCard from "./PopupDeleteCard";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [idDeleteCard, setIdDeleteCard] = React.useState(''); // также открывает попап, если стейт не пустой
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isRenderLoading, setIsrenderLoading] = React.useState(false);

  React.useEffect(()=>{
    api.getUserInfo().then((res)=>{
      setCurrentUser(res);
    }).catch((err)=>{console.log(err)});
    api.getInitialCards().then((res)=>{
      setCards(res);
    }).catch((err)=>{console.log(err)});
  }, [])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);

  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  }

  const handleDeleteCard = () => {
      setIsrenderLoading(true);
      api.deleteCard(idDeleteCard)
      .then(()=>{
        setCards((state) => state.filter((c)=> idDeleteCard !== c._id));
        setIdDeleteCard('');
      })
      .catch((err)=>{console.log(err)})
      .finally(()=>{setIsrenderLoading(false)}) 
  }

  const handleOpenPopupDelete = (cardId) => {
      setIdDeleteCard(cardId);
    }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard)=>{
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err)=>{console.log(err)});
  }

  const handleUpdeteUser = (data) => {
    setIsrenderLoading(true);
    api.editUserInfo(data.name, data.about)
    .then((res)=>{
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err)=>{console.log(err)})
    .finally(()=>{setIsrenderLoading(false)});
  }

  const handleUpdeteAvatar = (link) => {
    setIsrenderLoading(true);
    api.avatarEdit(link)
    .then((res)=>{
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err)=>{console.log(err)})
    .finally(()=>{setIsrenderLoading(false)});
  }

  const handleAddPlaceSubmit = (data) =>{
    setIsrenderLoading(true);
    api.addCard(data)
    .then((res)=>{
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch((err)=>{console.log(err)})
    .finally(()=>{setIsrenderLoading(false)});
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIdDeleteCard('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <InitialCardsContext.Provider value={cards}>
        <div className="App">
          <Header />
          <Main 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick = {handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete = {handleOpenPopupDelete}
          />
          <Footer />

          <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          isClose = {closeAllPopups}
          onUpdateAvatar={handleUpdeteAvatar}
          isLoading = {isRenderLoading}/>

          <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          isClose = {closeAllPopups}
          onUpdateUser={handleUpdeteUser}
          isLoading = {isRenderLoading} />

          <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          isClose = {closeAllPopups}
          onAddPlace = {handleAddPlaceSubmit}
          isLoading = {isRenderLoading}/>
    
          <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
        </div>

          <PopupDeleteCard 
          isOpen={idDeleteCard}
          isClose={closeAllPopups}
          onDeleteCard = {handleDeleteCard}
          isLoading = {isRenderLoading}/>

      </InitialCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
