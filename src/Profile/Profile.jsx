import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './profile.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUserAvatar, setUserPhotos } from '../store/registration';

import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserInfo from './UserInfo/UserInfo';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [images, setImages] = React.useState([]);
  const [imageURLs, setImageURLs] = React.useState([]);
  const [check, setCheck] = React.useState(1);

  function onAvatarChange(e) {
    setImages([...e.target.files]);
    setCheck(1);
  }

  function onPhotosChange(e) {
    setImages([...e.target.files]);
    setCheck(2);
  }

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipeToSlide: true,
  };

  useEffect(() => {
    if (images.length < 1) return;

    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    if (check === 1) dispatch(setUserAvatar(newImageUrls));

    images.forEach((image) => dispatch(setUserPhotos(URL.createObjectURL(image))));
    setImages([]);
    setImageURLs(newImageUrls);
  }, [images]);

  return (
    <div className="container">
      <div className="avatar">
        <div className="avatar_backGround">
          {user.userAvatar === 0 ? (
            <img
              src="https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"
              alt=""
              className="avatar_image"
            />
          ) : (
            <img src={user.userAvatar} alt="" className="avatar_image" />
          )}

          <div className="avatar_button">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onAvatarChange}
              className="avatar_input"
            />
            <div className="avatar_change">Сhange photo</div>
          </div>
        </div>
      </div>

      <UserInfo />
      <div className="friends">
        <div className="friends_backGround">
          <div className="friends_title">Friends</div>
        </div>
      </div>

      <div className="images">
        <div className="images_backGround">
          {user.userPhotos.length < 2 ? (
            <div className="costili1"></div>
          ) : user.userPhotos.length === 2 ? (
            <div className="costili2"></div>
          ) : (
            ''
          )}
          <Slider {...settings}>
            {user.userPhotos.map((image, index) => {
              return (
                <Link to={`/Photo/${index}`} className="slider_link" key={index}>
                  <div className="image_item" key={index}>
                    <img src={image} alt="" className="slider_image" width="290px" height="290px" />
                  </div>
                </Link>
              );
            })}
          </Slider>
          <div className="images_button">
            <input
              type="file"
              name="file"
              multiple
              accept="image/*"
              onChange={onPhotosChange}
              className="images_input"
            />
            <div className="add_images">Add photos</div>
          </div>
        </div>
      </div>

      <div className="subscriptions">
        <div className="subscriptions_backGround">
          <div className="subscriptions_title">Subscriptions</div>
        </div>
      </div>

      <div className="post">
        <div className="post_backGround">
          <img src={user.userAvatar} alt="" className="post_avatar" />
          <div className="post_title">Post an entry</div>
          <FontAwesomeIcon className="post_image" icon="fa-regular fa-image" />
          <FontAwesomeIcon className="post_video" icon="fa-solid fa-film" />
          <FontAwesomeIcon className="post_audio" icon="fa-solid fa-music" />
          <FontAwesomeIcon className="post_location" icon="fa-solid fa-location-pin" />
          <FontAwesomeIcon className="post_file" icon="fa-solid fa-file-lines" />
        </div>
      </div>

      <div className="videos">
        <div className="videos_backGround">
          <div className="videos_title">Video recordings</div>
        </div>
      </div>

      <div className="ready_post">
        <div className="ready_post_backGround">
          <img src={user.userAvatar} alt="" className="ready_post_avatar" />
          <div className="ready_post_fullName">Alexey Tsvetkov</div>
          <div className="ready_post_date"> 23 July 2022</div>
          <FontAwesomeIcon className="ready_post_menu" icon="fa-solid fa-ellipsis" />
          <div className="ready_post_message">Who is your friend?</div>
          <img src="" alt="" className="ready_post_content"></img>
          <div className="ready_post_from">Videos from Alexey Tsvetkov</div>
          <div className="ready_post_views">Views 341</div>
          <FontAwesomeIcon className="ready_post_like" icon="fa-regular fa-thumbs-up" />
          <FontAwesomeIcon className="ready_post_dislike" icon="fa-regular fa-thumbs-down" />
          <FontAwesomeIcon className="ready_post_comment" icon="fa-regular fa-comment-dots" />
          <FontAwesomeIcon className="ready_post_share" icon="fa-solid fa-share-nodes" />
        </div>
      </div>

      <div className="music_profile">
        <div className="music_backGround">
          <div className="music_title">Music</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
