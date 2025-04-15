
import './App.css';
import React,{useEffect, useState} from 'react';
function App() {

  const [noteText,setNoteText]= useState('')
  const[notes,setNotes]=useState([])
  const[editNoteId,setEditNoteId]= useState(null);
  const[editText,setEditText]=useState('')

  useEffect(()=>{
    const storedNotes=localStorage.getItem('my-notes');
    if(storedNotes){
      try{
      const parsedNotes = JSON.parse(storedNotes);
      if(Array.isArray(parsedNotes)){
        setNotes(parsedNotes);
      }
      }catch(error){
        console.log('error');
      }
    }
  },[]);
  useEffect(()=>{
    localStorage.setItem('my-notes',JSON.stringify(notes));
  },[notes]);
  const addNote=()=>{
     if(noteText.trim()){
       const newNote={
         id:Date.now(),
         text:noteText,
       };
       setNotes([newNote,...notes])
       setNoteText('')
     }
  };
  const deleteNote=(id)=>{
    const filterNotes = notes.filter((note)=>note.id!==id);
    setNotes(filterNotes);

  }
  const startEditing=(note)=>{
    setEditNoteId(note.id);
    setEditText(note.text)
  }
  const saveEdit=(id)=>{
    const updatedNotes = notes.map((note)=>note.id===id?{...note,text:editText}:note);
    setEditNoteId(null);
    setEditText('')
    setNotes(updatedNotes)

  }
  return (
    <div className='app'>
      <h1>📝 My Notes App</h1>
      <div className='input-section'>
        <input
        type='text'
        placeholder='add your text here...'
        value={noteText}
        onChange={(e)=>setNoteText(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className='notes-list'>
      {notes.map((note) => (
          <div key={note.id} className="note">
            {editNoteId === note.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button className="save-btn" onClick={() => saveEdit(note.id)}>
                  💾
                </button>
              </>
            ) : (
              <>
                <p>{note.text}</p>
                <button className="edit-btn" onClick={() => startEditing(note)}>
                  ✏️
                </button>
              </>
            )}
          <button className="delete-btn" onClick={()=>deleteNote(note.id)}>🗑️</button>
        </div>
      ))}
      
      </div> 
    </div>
  );
}

export default App;
