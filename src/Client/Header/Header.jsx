import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { logout, selectIsAuth } from '../store/slices/auth';

function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };
  return (
    <div className="header">
      <div className="container">
        <div className="wave">Wave</div>
        <div className="control_panel">
          <FontAwesomeIcon className="profile" icon="fa-regular fa-circle-user" />
          <FontAwesomeIcon className="bell" icon="fa-regular fa-bell" />
          <FontAwesomeIcon className="news" icon="fa-solid fa-pager" />
          <FontAwesomeIcon className="message" icon="fa-regular fa-comment" />
          <FontAwesomeIcon className="users" icon="fa-solid fa-user-group" />
          <FontAwesomeIcon className="community" icon="fa-solid fa-users" />
          <FontAwesomeIcon className="image" icon="fa-regular fa-image" />
          <FontAwesomeIcon className="video" icon="fa-solid fa-film" />
          <FontAwesomeIcon className="music" icon="fa-solid fa-music" />
        </div>
        <FontAwesomeIcon className="menu" icon="fa-solid fa-align-justify" onClick={onClickLogout} />
      </div>
    </div>
  );
}

export default Header;
