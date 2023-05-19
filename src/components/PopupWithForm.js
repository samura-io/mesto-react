function PopupWithForm(props) {

  return (
      <div className={`popup popup_content_${props.name} ${props.isOpen&&'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.isClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} noValidate>
            {props.children}
            <button type="submit" className="popup__save-button" aria-label="Создать">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm