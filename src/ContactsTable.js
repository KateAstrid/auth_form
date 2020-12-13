import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Token = document.cookie.split('=')[1]

export const decodeUserId = (token) => {
  return JSON.parse(atob(token.split('.')[1])).sub
}

//request for contacts

export const requestContacts = (setContacts) => {
  fetch(`/contacts?userId=${decodeUserId(Token)}`,{
    headers: {
      Authorization: `Bearer ${Token}`
    },
  })
  .then(response => response.json())
  .then(data => setContacts(data))
  .catch(error => console.error(error)) 
}

//search component

export const SearchField = ({ search, setSearch }) => {
  return (
    <input type='text' value={search} placeholder='search' onChange={event => setSearch(event.target.value)}></input> 
  )
}

//every line with contact in the table

export const OneContactLine = ({ name, number, email, id, setContacts }) => {
  const [edited, setEdited] = useState(false);
  const [changedNumber, setChangedNumber] = useState(number);
  const [changedName, setChangedName] = useState(name);
  
  const handleDelete = (id) => {
    fetch(`/600/contacts/${id}`,{
      headers: {
        Authorization: `Bearer ${Token}`
      },
      method: "DELETE"
    })
    .then(data => {
      console.log(data);
      requestContacts(setContacts)})
    .catch(error => console.error(error)) 
  }

  const handleSave = (id) => {
    if ((name !== changedName) || (number !== changedNumber)) {
      fetch(`/600/contacts/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        method: "PATCH",
        body: JSON.stringify({"name":`${changedName}`, "number":`${changedNumber}`})
      })
      .then(data => {
        console.log(data);
        requestContacts(setContacts);
      })
      .catch(error => console.error(error)) 
    };
    setEdited(false);
  }

  return (
    <>
      {edited ? 
        <>
        <div className='cell small'>
          <input type='text' defaultValue={name} onChange={event => setChangedName(event.target.value)} />
        </div>
        <div className='cell big'>
          <input type='text' defaultValue={email} onChange={event => setChangedName(event.target.value)} />
        </div>
        <div className='cell big'>
          <input type='text' defaultValue={number} onChange={event => setChangedNumber(event.target.value)} />
          <div className='groupIcons'>
            <FontAwesomeIcon icon="check-square" className='oneIcon save' onClick={() => handleSave(id)}/>
            <FontAwesomeIcon icon="trash-alt" className='oneIcon'  onClick={() => handleDelete(id)}/> 
          </div>
        </div>
        </> :
        <>
          <div className='cell small'>{name}</div>
          <div className='cell big'>{email}</div>
          <div className='cell big'>
            {number}
            <div className='groupIcons'>
              <FontAwesomeIcon icon="edit" className='oneIcon' onClick={() => setEdited(!edited)}/> 
              <FontAwesomeIcon icon="trash-alt" className='oneIcon' onClick={() => handleDelete(id)}/> 
            </div>
          </div> 
        </>
      } 
    </>
  )
}

//add new contact

export const AddField = ({ setContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = (event) => {
    event.preventDefault();

    if ((name !== '') && (number !== '')) {
      fetch('/600/contacts',{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        method: "POST",
        body: JSON.stringify({"name":`${name}`, "number":`${number}`, "email":`${email}`, userId:decodeUserId(Token)})
      })
      .then(data => {
        console.log(data);
        requestContacts(setContacts);
        setNumber('');
        setName('');
        setEmail('');
      })
      .catch(error => console.error(error))
    }
  };
  
  return (
    <div className='first line'>
      <div className='cell small'>
        <input type='text' value={name} placeholder='name' onChange={event => setName(event.target.value)}></input>
      </div>
      <div className='cell big'>
        <input type='text' value={email} placeholder='email' onChange={event => setEmail(event.target.value)}></input>
      </div>
      <div className='cell big'>
        <input type='text' value={number} placeholder='number' onChange={event => setNumber(event.target.value)}></input>
        <FontAwesomeIcon icon="plus-square" className='oneIcon plus' onClick={handleClick}/>  
      </div>
    </div>
  )
}

