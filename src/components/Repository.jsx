import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Modal from "./Modal";
const Repository = ({ repo }) => {
  const { slug, userpath } = useParams();
  const [detailRepo, setDetailRepo] = useState([]);
  const [tags, setTags] = useState();
  const [issues, setIssues] = useState();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState();

  useEffect(() => {
    console.log(userpath);
    console.log(slug);
    const getRepo = repo && repo.filter((f) => f.name === slug);
    setDetailRepo(getRepo);

    const getTags = async () => {
      await fetch(`https://api.github.com/repos/${userpath}/${slug}/labels`, {
        method: "GET",
        headers: {
          Authorization: "token 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",
        },
      })
        .then((resp) => resp.status === 200 && resp.json())
        .then((data) => {
          setTags(data);
        });
    };
    getTags();

    const getIssues = async () => {
      await fetch(`https://api.github.com/repos/${userpath}/${slug}/issues`, {
        method: "GET",
        headers: {
          Authorization: "token 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",
        },
      })
        .then((resp) => resp.status === 200 && resp.json())
        .then((data) => {
          setIssues(data);
        });
    };
    getIssues();
  }, [slug, userpath]);

  const handleClick = (i) => {
    setOpen(!open);
    setInfo(i)
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {detailRepo &&
        detailRepo.map((m, index) => (
          <div className="box m-3" key={index}>
            <h3 className="title is-3">{m.name}</h3>
            <p>Fecha de creación</p>
            <h6 className="subtitle is-6">
              {moment(m.created_at).format("lll")}
            </h6>
            <p>Última actualización</p>
            <h6 className="subtitle is-6">
              {moment(m.updated_at).format("lll")}
            </h6>
            {tags &&
              tags.map((t, tIndex) => (
                <span key={tIndex} className="tag is-info is-small m-1">
                  {t.name}
                </span>
              ))}
            
            {issues && (
              <>
                <h3>Issues</h3>
                <ul>
                {issues.map((i, index) => (
                    <li key={index} style={{ display: "flex" }}>
                      <h5 className="title is-5">{i.title}</h5>
                      <button onClick={() => handleClick(i)}>ver</button>
                      {i.pull_request ? (
                        <span class="tag is-info is-small">Pull Request</span>
                      ) : (
                        <span class="tag is-primary is-small">Issue</span>
                      )}
                      {open && (
                        <Modal i={info} slug={`${userpath}/${slug}`} close={() => handleClose()}/>
                      )}
                    </li>
                ))}
                </ul>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default Repository;
