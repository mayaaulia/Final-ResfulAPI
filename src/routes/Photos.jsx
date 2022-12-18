import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [id, setId] = useState('id')
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const deletePhoto = (id) => {
    fetch(`http://localhost:3001/photos/${id}`, {
  method: "DELETE", // HTTP method
  }).then(()=>  setPhotos( photos.filter((item) => item.id !== id)))

  };
  useEffect(() => {
    setLoading(false);
    fetch(`http://localhost:3001/photos?q=${submited}&_sort=${id}&_order=${sort}`)
    // ubah response menjadi JSON
    .then((response) => response.json())
    // simpan data ke dalam state
    .then((json) => {
      // set data
      setPhotos(json);
      // set loading menjadi false
      setLoading(false);
    })
    // handle error
    .catch((error) => {
      // set error
      setError(error);
      // set loading menjadi false
      setLoading(false);
    });// TODO: answer here
  }, [sort, submited]);

  useEffect(() => {
    setLoading(false);
    // fetch data dari API
    fetch(`http://localhost:3001/photos`)
      // ubah response menjadi JSON
      .then((response) => response.json())
      // simpan data ke dalam state
      .then((json) => {
        // set data
        setPhotos(json);
        // set loading menjadi false
        setLoading(false);
      })
      // handle error
      .catch((error) => {
        // set error
        setError(error);
        // set loading menjadi false
        setLoading(false);
      });
  }, []);
  // const getSort = () => {
  //   const data = [...photos];
  //   // if (sort === "asc") {
  //   //   data.sort((a, b) => (a.id < b.id ? -1 : 1));
  //   //   return 0;
  //   //       setPhotos(data);
  //   // }
  //   if (sort === "desc") {
  //     data.sort((a, b) => (a.id < b.id ? 1 : -1));
  //     setPhotos(data);
  //   }
  //   console.log(data);
  // };

  function sortData(a,b) {
    if(sort === "desc") {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            const sorted = [...photos].sort(sortData); //calling compare function
            setPhotos(sorted); //storing sorted values
            console.log(sorted)
            return 0;
    }

  }   
    const sortedData = () => {
      const sorted = [...photos].sort(sortData); //calling compare function
      setPhotos(sorted); //storing sorted values
      console.log(sorted)
    };


  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select 
            onChange={(e) => setSort(e.target.value)}
            onClick={sortedData}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
