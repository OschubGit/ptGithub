import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import moment from "moment"

const Repository = ({repo}) => {
    const slug = useParams();
    const [detailRepo, setDetailRepo] = useState();
    const [tags, setTags] = useState();
    const [issues, setIssues] = useState();
    const [pulls, setPulls] = useState();

    useEffect(() => {
        const slugValue = slug.slug;
        const getRepo = repo && repo.filter((f) => f.name === slugValue)
        setDetailRepo(getRepo);
        const slugRepo = "OschubGit/imperial-app";
        const getTags = async () => {
            await fetch(`https://api.github.com/repos/${slugRepo}/labels`,{
                method: "GET",
                headers: {Authorization: "token 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",}})
              .then((resp) => resp.status === 200 && resp.json())
              .then((data) => {
                setTags(data);
            });
        }
        getTags();
        

        
    },[slug])
    
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
                    <ol key={iIndex}>
                    <li>{i.title}</li>
                    </ol>
                    </>
                ))}
                    <h3>Pulls Request</h3>
                {pulls && pulls.map((p, pIndex) => (
                    <>
                    <ol key={pIndex}>
                    <li>{p.title}</li>
                    </ol>
                    </>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Repository