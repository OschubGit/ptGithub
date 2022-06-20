import moment from "moment";
import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";

const Modal = ({i, close, slug}) => {
    const [comments, setComments] = useState()
    useEffect(() => {
        const getUser = async () => {
            await fetch(`https://api.github.com/repos/${slug}/issues/${i.number}/comments`,{
                method: "GET",
                headers: {Authorization: "token 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",}})
                .then((resp) => resp.status === 200 && resp.json())
                .then((data) => {
                    setComments(data);
            });
        }
            getUser()
        }, [slug])
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <h1 className="title">{i.title}</h1>
        <ReactMarkdown>{i.body}</ReactMarkdown>
        <hr/>
        {comments && 
        <>
        <h2 className="title">Comentarios</h2>
            <ul>
            {comments.map((c) => (
            <>
            <li>{c.body}</li>
            {moment(c.created_at).format("llll")}
            <div>
            <small>{c.author_association}</small>
            </div>
            </>
            ))}
            </ul>
        </>
        }
      </div>
      <button
        onClick={close}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
