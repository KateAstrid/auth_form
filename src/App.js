import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faSearch, faCheckSquare,  faTrashAlt, faEdit, faPlusSquare, faEye } from '@fortawesome/free-solid-svg-icons'
import { LoginComponent } from './LoginComponent.js'
import { Token, requestContacts, OneContactLine, decodeUserId, AddField, SearchField } from './ContactsTable.js'

library.add(faFan, faSearch, faCheckSquare,  faTrashAlt, faEdit, faPlusSquare, faEye)

//all data on the page with contacts

const Data = () => {
  const [contacts, setContacts] = useState();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState([]);
  
  if (contacts === undefined) {
    requestContacts(setContacts)
  };

  const searchContacts = (contact) => {
    return contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.number.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase())
  };
  
  const handleBack = () => {
    document.location.assign('/');
    document.cookie =`token=''`; 
  };

  const handleSort = (event, key) => {
    event.preventDefault()
    const data = [...contacts]

    if (sort[0] === key && sort[1] === 'asc') {
      data.sort((a,b) => a[key].localeCompare(b[key]))
      setSort([key, 'des'])
    } else {
      data.sort((a,b) => b[key].localeCompare(a[key])) 
      setSort([key, 'asc'])
    };
    setContacts(data)
  };

  const filtredContacts = (
    (contacts && search.length > 0) ? contacts.filter(contact => searchContacts(contact, search)) : contacts
  );

  const htmlContacts = (
    (filtredContacts || []).map(contact => {
      const name = contact.name;
      const number = contact.number;
      const email = contact.email;
      const id = contact.id;
      return (
        <div className='line' key={id}>
          <OneContactLine name={name} number={number} email={email} id={id} search={search} setContacts={setContacts} /> 
        </div>
      )
    })
  );

  return (
    <div className='container'>
      <div className='header'>
        Contacts
        <button className="backButton" onClick={() => handleBack()}>Sing Out</button>
      </div>
      <div className='searchLine'>
        <FontAwesomeIcon icon="fan" className='spinner' size='2x'/>
        <div className='search'>
          <FontAwesomeIcon icon="search" className='oneIcon' size='1x'/>
          <SearchField search={search} setSearch={setSearch}/>
        </div>
      </div>
        <div className='table'>
          <div className='first line'>
            <div className='cell small sort' onClick={event => handleSort(event, 'name')}>Name</div>
            <div className='cell big sort' onClick={event => handleSort(event, 'email')}>E-mail</div>
            <div className='cell big sort' onClick={event => handleSort(event, 'number')}>Number</div>
          </div>
          { htmlContacts }
          <AddField 
            setContacts={setContacts} 
            setSearch={setSearch} 
            search={search} 
            Token={Token} 
            decodeUserId={decodeUserId} 
            requestContacts={requestContacts}/>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={props => (<LoginComponent {...props} /> )}  />
        <Route path='/contacts' render={props => (<Data {...props}  /> )}  /> 
      </Switch>
    </Router>
  );
}

export default App;
