import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";

const Nav = ({content}) => {
const [repos, setRepos] = useState()
const user = content;

useEffect(() => {
    const getUser = async () => {
        await fetch(`https://api.github.com/users/${user.login}/repos`)
          .then((resp) => resp.status === 200 && resp.json())
          .then((data) => {
            setRepos(data);
        });
    }
    if (user) {
        getUser()
    }
}, [user])

return (
    <div>
      <article className=" is-link">
        <p className="panel-heading" style={{height: "68px"}}>Repositorios</p>
        {repos && repos.map((r, index) => (
        <Link to={`/repository/${r.name}`} className="panel-block is-active"  key={index}>
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
            <p>{r.name}</p>
        </Link>
        ))}
      </article>
    </div>
  );
};

export default Nav;
