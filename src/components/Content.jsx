import React, {useEffect, useState} from "react";
import {useParams } from "react-router-dom";

const Content = ({ content }) => {
  const user = content;
  const slug = useParams();
  const [repo, setRepo] = useState();

  useEffect(() => {
    const getUser = async () => {
        await fetch(`https://api.github.com/repos/${user.login}/${slug}`)
          .then((resp) => resp.status === 200 && resp.json())
          .then((data) => {
            setRepo(data);
        });
    }
    getUser()
}, [user])

  return user ? (
    <div>
      <div className="container is-max-desktop my-5">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Followers</p>
              <p className="title">{user.followers}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Following</p>
              <p className="title">{user.following}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Public Repos</p>
              <p className="title">{user.public_repos}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Likes</p>
              <p className="title">789</p>
            </div>
          </div>
        </nav>
      </div>
      {console.log(repo)}
    </div>
  ) : (
    <p>No hay usuario</p>
  );
};

export default Content;
