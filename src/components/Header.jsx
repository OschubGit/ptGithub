import React, { useState } from "react";
import Content from "./Content";
import Nav from "./Nav";

const Header = () => {
  const [value, setValue] = useState("");
  const [user, setUser] = useState();

  const handleClick = (e) => {
    e.preventDefault()
    console.log("nien")
    fetch(`https://api.github.com/users/${value}`)
      .then((resp) => resp.status === 200 && resp.json())
      .then((data) => {
        setUser(data);
    });

    setValue("")
  }

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
      <Content content={user} />
    </div>
    </div>
    </div>
  );
};

export default Header;
