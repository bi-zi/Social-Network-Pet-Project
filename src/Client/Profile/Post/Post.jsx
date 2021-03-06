import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCreatText,
  setCreateImg,
  setCreateImgDelete,
  setCreateVid,
  fetchUserPostsAll,
  fetchCreatePost,
  fetchPostPush,
} from '../../store/slices/post';

import { useParams } from 'react-router-dom';

import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/slices/user';

import { Link } from 'react-router-dom';
import './style.css';

function Post() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();
  const firstRef = React.useRef(null);
  const [postEffect, setPostEffect] = React.useState();

  localStorage.setItem('postImages', JSON.stringify(state.post.createImg));
  localStorage.setItem('postText', state.post.createText);

  const readyPhotos = state.post.createImg;
  const textLength = state.post.createText.length;
  const postText = state.post.createText;
  const numImg = readyPhotos.length;

  let linkСheck = state.post.createVid?.split('/');
  linkСheck = linkСheck?.[0] === 'https:';

  let url = state.post.createVid;
  let src = url?.split('/')[3]?.split('=')[1]?.split('&')[0];
  if (src === undefined) src = url.split('/')[3];
  if (src === 'embed') src = url?.split('/')[4];
  let local = src === undefined ? '' : `https://www.youtube.com/embed/${src}`;

  if (linkСheck) localStorage.setItem('postVideo', local);
  if (state.post.createVid?.length === 0) localStorage.setItem('postVideo', url);

  const sendPost = async () => {

    if ((textLength > 0 || numImg > 0 || local.length > 0) && state.post.userPosts.post.length === 0) {
      console.log(1);
      await dispatch(
        fetchCreatePost({ text: postText, videoPost: local, imagesPost: state.post.createImg }),
      );
    }

    if ((textLength > 0 || numImg > 0 || local.length > 0) && state.post.userPosts.post.length > 0) {
      console.log(2);
      await dispatch(
        fetchPostPush({ text: postText, videoPost: local, imagesPost: state.post.createImg }, id),
      );
    }
    if (textLength > 0 || numImg > 0 || local.length > 0) {
      await dispatch(fetchUserPostsAll(id));
      firstRef.current.value = '';
      dispatch(setCreateImgDelete([]));
      dispatch(setCreatText(''));
      dispatch(setCreateVid(''));
      setPostEffect();
    }
  };

  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, []);

  return (
    <div className="post_container">
      <img src={state.user.userOne?.[0]?.imageUrl} alt="" className="post_avatar" />

      <input
        ref={firstRef}
        type="text"
        className="post_text_input"
        placeholder="Post an entry"
        maxLength={180}
        defaultValue={postText}
        onChange={(e) => dispatch(setCreatText(e.target.value))}
      />
      <button className="post_make_button" type="submit" onClick={() => sendPost()}>
        <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
      </button>

      {/* imagesInput */}
      <FontAwesomeIcon className="post_image_icon" icon="fa-regular fa-image" />
      {numImg < 3 ? (
        <button onChange={() => dispatch(setInputNumber('2'))} className="post_image_input">
          <ImageParsing />
        </button>
      ) : (
        <div className="post_max_image">MAX</div>
      )}

      {/* videoInput */}
      <FontAwesomeIcon
        className="post_video_icon"
        icon="fa-solid fa-film"
        onClick={() => (postEffect !== 0 ? setPostEffect(0) : setPostEffect(1))}
      />
      {postEffect === 0 && !linkСheck ? (
        <input
          type="text"
          className="post_input_video"
          placeholder="Insert YouTube video link"
          onChange={(e) => dispatch(setCreateVid(e.target.value))}
        />
      ) : (
        ''
      )}

      {/*
      <FontAwesomeIcon className="post_audio_icon" icon="fa-solid fa-music" />
      <FontAwesomeIcon className="post_location_icon" icon="fa-solid fa-location-pin" />
      <FontAwesomeIcon className="post_file_icon" icon="fa-solid fa-file-lines" />
      */}

      <div className="wall_content">
        {/* postText */}
        {textLength > 0 ? <div className="post_show_text">{postText}</div> : ''}

        {/* imagesRender */}
        {numImg > 0 ? (
          <div className="post_images_container">
            {readyPhotos.map((image, index) => {
              return (
                <Link to={`/${id}/CreatePost/${index}`} key={index}>
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className={`post_image-${index} ${
                      index === 0
                        ? 'wall_large_image'
                        : index === 1
                        ? 'wall_small_right_image'
                        : 'wall_small_down_image'
                    }
                    ${numImg === 1 ? 'wall_one_image' : ''}
                    ${
                      numImg === 2 && index === 0
                        ? 'wall_two_image_first'
                        : numImg === 2 && index === 1
                        ? 'wall_two_image_second'
                        : ''
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          ''
        )}

        {/* videoRender */}
        {linkСheck ? (
          <>
            <button className="video_delete" onClick={() => dispatch(setCreateVid(''))}>
              Delete video
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${src}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="wall_iframe"></iframe>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Post;
