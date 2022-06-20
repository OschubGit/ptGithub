import React, {useEffect, useState} from "react";
import {useParams, useLocation } from "react-router-dom";
import Repository from "./Repository";

const Content = ({ user }) => {
  const slug = useParams();
  const location = useLocation();
  const [repos, setRepos] = useState();
  const [repo, setRepo] = useState();

    useEffect(() => {
        const getUser = async () => {
            await fetch(`${user.repos_url}`,{
                method: "GET",
                headers: {Authorization: "token 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",}})
              .then((resp) => resp.status === 200 && resp.json())
              .then((data) => {
                setRepos(data);
            });
        }
        const map = repos && repos.map((m) => m)
        setRepo(map)
        if (user) {
            getUser()
        }
        }, [slug, location.pathname])


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
            {user.twitter_username && (
          <div className="level-item has-text-centered">
            <div>
                <>
                <p className="heading">Twitter</p>
                <p className="title">{user.twitter_username}</p>
                </>
            </div>
          </div>
            )}
        </nav>
      </div>
      <Repository repo={repo}/>
    </div>
  ) : (
    <p>No hay usuario</p>
  );
};

export default Content;
