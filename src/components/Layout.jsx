import React, { useEffect, useState } from "react";
import Content from "./Content";
import Nav from "./Nav";

const Layout = () => {
  const [value, setValue] = useState("oschubgit");
  const [user, setUser] = useState();

  const handleClick = (e) => {
    e.preventDefault()
    fetch(`https://api.github.com/users/${value}`,{
      method: "GET",
      headers: {Authorization: "token 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"}})
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
    });

    setValue("")
  }

  useEffect(() => {
    console.log(user)
  },[user])

  return (
    <div className="app-container">
    <div className="nav">
      <Nav content={user && user}/>
    </div>
    <div className="header">
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src={user ? user.avatar_url : "https://bulma.io/images/bulma-logo.png"}
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="{112}"
              height="{28}"
            />
            {user && user.name}
            {user && user.login}
          </a>
        </div>
        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control"></p>
                <div className="field has-addons">
                  <div className="control">
                    <form onSubmit={handleClick} style={{display: "flex"}}>
                    <input
                      className="input"
                      onChange={e => setValue(e.target.value.toLowerCase())}
                      value={value}
                      type="text"
                      placeholder="Find a repository"
                    />
                  <div className="control">
                    <button 
                      className="button is-info"
                      type="submit"
                      >
                        Buscar
                      </button>
                  </div>
                    </form>
                  </div>
                </div>
                <p/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    <div className="content">
      <Content user={user} />
    </div>
    </div>
    </div>
  );
};

export default Layout;
