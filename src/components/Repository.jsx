import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import moment from "moment"

const Repository = ({repo}) => {
    const {slug, userpath} = useParams();
    const [detailRepo, setDetailRepo] = useState([]);
    const [tags, setTags] = useState();
    const [issues, setIssues] = useState();
    const [pulls, setPulls] = useState();

    useEffect(() => {
        console.log(userpath)
        console.log(slug)
        const getRepo = repo && repo.filter((f) => f.name === slug)
        setDetailRepo(getRepo);
        
        const getTags = async () => {
            await fetch(`https://api.github.com/repos/${userpath}/${slug}/labels`,{
                method: "GET",
                headers: {Authorization: "token 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",}})
                .then((resp) => resp.status === 200 && resp.json())
                .then((data) => {
                    setTags(data);
                });
            }
            getTags();
        
        const getIssues = async () => {
            await fetch(`https://api.github.com/repos/${userpath}/${slug}/issues`,{
                method: "GET",
                headers: {Authorization: "token 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" }})
              .then((resp) => resp.status === 200 && resp.json())
              .then((data) => {
                setIssues(data);
            });
        }
        const getPulls = async () => {
            await fetch(`https://api.github.com/repos/${userpath}/${slug}/pulls`,{
                method: "GET",
                headers: {Authorization: "token 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" }})
              .then((resp) => resp.status === 200 && resp.json())
              .then((data) => {
                setPulls(data);
            });
        }
        getIssues();
        getPulls();
        
    },[slug, userpath])
    
    return (
        <div>
        {detailRepo && detailRepo.map((m, index) => (
            <div className="box m-3" key={index}>
                <h3 className="title is-3">{m.name}</h3>
                <p>Fecha de creación</p>
                <h6 className="subtitle is-6">{moment(m.created_at).format('lll')}</h6>
                <p>Última actualización</p>
                <h6 className="subtitle is-6">{moment(m.updated_at).format('lll')}</h6>
                {tags && tags.map((t, tIndex) => (
                <span key={tIndex} className="tag is-info is-small m-1">
                    {t.name}
                </span>
                ))}
                <h3>Issues</h3>
                {issues && issues.map((i, iIndex) => (
                    <>
                    <ul key={iIndex}>
                    <li>
                        {i.title}
                        <caption>{i.body}</caption>
                    </li>
                    </ul>
                    </>
                ))}
                <h3>Pulls Request</h3>
                {pulls && pulls.map((p, pIndex) => (
                    <>
                    <ul key={pIndex}>
                    <li>{p.title}</li>
                    </ul>
                    </>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Repository