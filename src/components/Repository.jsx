import React from 'react'

const Repository = () => {


    fetch("https://api.github.com/repos/midudev/accordion-menu")
          .then((resp) => resp.status === 200 && resp.json())
          .then((data) => {
            console.log(data);
        });
  return (
    <div>Repository</div>
  )
}

export default Repository