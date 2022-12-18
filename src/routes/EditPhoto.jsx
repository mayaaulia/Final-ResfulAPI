import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    // TODO: answer here
    const data = {
      imageUrl,
      captions,
      createdAt:"",
      updatedAt:"",
    
    }
    
    fetch(`http://localhost:3001/photos/${id}`, {
      method: "PATCH", // HTTP method menggunakan POST
      headers: {
        // HTTP headers
        "Content-Type": "application/json", // type data yang dikirim
      },
      body: JSON.stringify(data), // data yang dikirim
    })
      .then((response) => response.json()).then((json) => console.log(json));
  };

  useEffect(() => {
    setLoading(false);
    // fetch data dari API
    fetch(`http://localhost:3001/photos/${id}`)
      // ubah response menjadi JSON
      .then((response) => response.json())
      // simpan data ke dalam state
      .then((json) => {
        // set loading menjadi false
        setLoading(false);
        setImageUrl(json.imageUrl)
        setCaptions(json.captions)
        console.log(json)
      })
      // handle error
      .catch((error) => {
        // set error
        setError(error);
        // set loading menjadi false
        setLoading(false);
      });
    // TODO: answer here
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <h1>{captions}</h1>
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
