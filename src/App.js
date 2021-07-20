import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import 'modern-normalize/modern-normalize.css';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storageContacts) {
      this.setState({ contacts: storageContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
