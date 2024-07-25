import { useState, Fragment, useEffect } from 'react'
import './App.css'
import { createApi } from "unsplash-js"

const api = createApi({
  accessKey: "e1uyUwS-ZeVJucBPfEHg1tKtwYpH5apYxBCWZI1fBkY"
});



const PhotoComp = ({ photo }: any) => {
  const { user, urls } = photo;

  return (

    <Fragment>

      <a href="https://react.dev" target="_blank">
        <div className="card" >
          <img className="img" src={urls.regular} />
        </div>
      </a>
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        <p className="read-the-docs">
          {user.name}
        </p>
      </a>

    </Fragment>
  );
};

function App() {

  const [data, setPhotosResponse] = useState(Object);

  api.users.getPhotos
  useEffect(() => {
    api.users
      .getPhotos({
        username: "erraticframe",
        orientation: "landscape",
        stats: true
      })
      .then(result => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);


  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="feed">
        <ul className="columnUl">
          {data.response.results.map(({photo}:any) => (
            <li key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }


}

export default App
