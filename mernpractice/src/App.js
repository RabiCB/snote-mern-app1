import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs'


function App() {
  const [value, setValue] = useState([]);
  const [comment, setComment] = useState({
    title: "",
    post: "",
    date:'',
   
  });
const intialvalue=({
  title: "",
  post: "",

})

    
  const [search, setSearch] = useState("");
  const handleInput = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  const fetchApi = async () => {
    const res = await fetch("http://localhost:3000/users");
    const {data} = await res.json();
    setValue(data);
    console.log(data);
  };

  useEffect(() => {
    fetchApi();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "content-type": "application/JSON",
      },
    });
    fetchApi();
    setComment(intialvalue);
  };
  const handleDelete = async (_id) => {
    const res = await fetch(`http://localhost:3000/users/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("sucessful");
    }
    fetchApi();

  };
  const current = new Date();
  const date1= `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const formatdate=(date)=>{
    return dayjs(date).format('D MMM,YYYY')
  }
  
  
  return (
    <div className="body">
      <Navbar date={date1} setSearch={setSearch} />
      <div className="app-body" style={{ marginTop: "2rem" }}>
        <div className="post-body">
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            id="outlined-name"
            label="Title"
            name="title"
            className="input"
            value={comment.title}
            onChange={handleInput}
          />
          <TextField
            id="outlined-uncontrolled"
            label="post"
            name="post"
            className="input"
            defaultValue="foo"
            value={comment.post}
            onChange={handleInput}
          />
          <input type="date"
          name="date"
          onChange={handleInput}
          value={comment.date}
          className="date"
          >
          </input>
          <Button type="submit"  className="btn"  variant="contained">Submit</Button>
    
          </form>
        </div>
        <div>
        </div>
        {value
          .filter((m) => {
            if (search === "") {
              return m;
            } else if (
              m.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return m;
            }
          })
          .map((m) => {
            return (
              <div className="note-body" key={m._id}>
                <h3>{m.title}</h3>
                <span>{formatdate(m.date)}</span>
                <p>{m.post}</p>
                <DeleteIcon className="delete-btn" onClick={()=>handleDelete(m._id)}/>
              </div>
            );
          })}
      </div>
 </div>
  );
}

export default App;
