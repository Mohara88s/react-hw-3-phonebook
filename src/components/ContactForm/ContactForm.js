import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  hendelInputChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };
  hendelSubmit = event => {
    event.preventDefault();

    const newContact = {
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    };
    this.props.onSubmit(newContact);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.ContactForm} onSubmit={this.hendelSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.hendelInputChange}
            value={this.state.name}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.hendelInputChange}
            value={this.state.number}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
