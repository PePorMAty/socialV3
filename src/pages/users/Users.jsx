import React from "react";
import s from "./Users.module.scss";
import avatar from "../../assets/avatar.jpg";
import Preloader from "../../UI/preloader/Preloader";
import { NavLink } from "react-router-dom";
import Paginator from "../../UI/paginator/Paginator";

const Users = (props) => {
  return (
    <div className={s.d}>
      {props.isFetching ? <Preloader /> : null}
      <Paginator
        pagesCount={props.pagesCount}
        pages={props.pages}
        currentPage={props.currentPage}
        onPageChanged={props.setCurrentPage}
        portionSize={props.portionSize}
      />
      {/*  <div className="">
        {props.pages.map((p) => (
          <span
            key={p}
            className={props.currentPage === p ? s.selectedPage : s.defPage}
            onClick={() => props.setCurrentPage(p)}
          >
            {p}
          </span>
        ))}
      </div> */}
      {props.users.map((u) => (
        <div key={u.id} className={s.userCard}>
          <div className={s.user}>
            <div>
              <NavLink to={`/profile/${u.id}`}>
                <img
                  className={s.img}
                  src={u.photos.small != null ? u.photos.small : avatar}
                  alt="img"
                />
              </NavLink>
            </div>

            <div className="">
              {u.followed ? (
                <button
                  className={s.btn}
                  disabled={props.inProgress}
                  onClick={() => props.unFollowUser(u.id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={s.btn}
                  disabled={props.inProgress}
                  onClick={() => props.followUser(u.id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className={s.userInfo}>
            <div className={s.miniContent}>
              <p className={s.text}>{u.name}</p>
              <p className={s.text}>{u.status}</p>
            </div>
            <div className={s.miniContent}>
              <p className={s.text}>{/* {u.location.country} */}</p>
              <p className={s.text}>{/* {u.location.city} */}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;

/*  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        img: "https://i.ytimg.com/vi/XGL_rWpBHzE/maxresdefault.jpg",
        followed: false,
        name: "Anton",
        status: "Hello",
        location: { city: "Novosibirsk", country: "Russia" },
      },
      {
        id: 2,
        img: "https://i.ytimg.com/vi/XGL_rWpBHzE/maxresdefault.jpg",
        followed: true,
        name: "Krynkul",
        status: "Hello",
        location: { city: "Novosibirsk", country: "Russia" },
      },
      {
        id: 3,
        img: "https://i.ytimg.com/vi/XGL_rWpBHzE/maxresdefault.jpg",
        followed: false,
        name: "Vanek",
        status: "Hello",
        location: { city: "Novosibirsk", country: "Russia" },
      },
    ]);
  } */
