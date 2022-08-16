import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const Book = ({ isLoggedin, setIsLoggedin }) => {
  const [book, setBook] = useState({});
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const [length, setLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setLength(res.data.names.length);
        setCreator(res.data.createdBy);
      })
      .catch((err) => console.log('GET MOVIE BY ID ERROR', err));
    axios
      .get('http://localhost:8000/api/current-user', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setUserId(res.data._id);
      })
      .catch((err) => console.log(err));
  }, [id, isLoggedin]);

  const deleteBook = (bookId) => {
    for (var a = 0; a < book.names.length; a++) {
      console.log(book.names[a]);
      let name = book.names[a];
      axios.delete(`http://localhost:8000/delete/${name}`)
        .then(res => {
          console.log("Images deleted successfully");
          axios
            .delete(`http://localhost:8000/api/books/${id}`)
            .then((res) => {
              navigate('/');
            })
            .catch((err) => console.log(err));
        });
    }
  };

  const runCallback = (cb) => {
    return cb();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "0em" }}>
      <h4 style={{ margin: "0", marginRight: "26em", marginBottom: "0.5em" }}>BOOK DETAILS</h4>
      <div className="app-wrapper">
        <div className="uploaded-images">
          <Carousel className="slides">
            {runCallback(() => {
              const row = [];
              for (var i = 0; i < length; i++) {
                row.push(<Carousel.Item key={i}><img src={require(`../../../server/public/${book.names[i]}`)} alt="smth"></img></Carousel.Item>);
              }
              return row;
            })
            }
          </Carousel>
        </div>
        <div className="form-wrapper" style={{display: "flex", flexDirection: "column", gap: "0.5em"}}>
          <h2>{book.title}</h2>
          <h3 style={{color: "#C27BA0"}}>{book.author}</h3>
          <p>{book.description}</p>
          <table style={{textAlign: "left"}}>
            <tr>
            <td>Genre:</td>
              <td>{book.genre}</td>
            </tr>
            <tr>
              <td>Rating:</td>
              <td>{book.rating}</td>
            </tr>
            <tr>
              <td>Link:</td>
              <td>{book.link}</td>
            </tr>
          </table>
          {console.log(creator, user)}
          {creator === userId ? (
            <div className="details-buttons">
              <button id="styled-button-one"><Link to={`/book/edit/${book._id}`} style={{ textDecoration: "none", color: "white" }}>Edit</Link></button>
              <button id="styled-button-two" onClick={deleteBook}>Delete</button>
            </div>
          ):null}
        </div>
      </div>
    </div>
  );
};

export default Book;