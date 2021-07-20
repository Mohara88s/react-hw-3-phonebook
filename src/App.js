import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import 'modern-normalize/modern-normalize.css';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Sarah Connor', number: '725-61-18' },
    ],
    filter: '',
  };

  addContact = contact => {
    const { contacts } = this.state;
    const { name } = contact;
    const isAvailable = contacts.some(
      contactItem => contactItem.name.toLowerCase() === name.toLowerCase(),
    );
    if (isAvailable) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  hendelFindeInputChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const contactsFiltred = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase()),
    );
    return (
      <div className={styles.container}>
        <h2>Phonebook</h2>
        <ContactForm contacts={contacts} onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.hendelFindeInputChange} />
        <ContactList
          contacts={contactsFiltred}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
