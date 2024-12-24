import { useState } from 'react';
import '../styles/contacts.css';
import contactIcon from '../assets/contact.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

function TrustedContacts({ contacts, onAddContact, onRemoveContact }) {
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    relationship: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newContact.name || !newContact.email) {
      setError('Name and email are required');
      return;
    }

    onAddContact(newContact)
      .then(() => {
        setNewContact({
          name: '',
          email: '',
          relationship: ''
        });
      })
      .catch(err => {
        setError(err.message || 'Failed to add contact');
      });
  };

  return (
    <div className="contacts-section">
      <div className="contacts-header">
        <h2>
          <img src={contactIcon} alt="" className="section-icon" />
          Trusted Contacts
        </h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="add-contact-form">
        <h3>Add New Contact</h3>
        
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={newContact.name}
            onChange={(e) => setNewContact({...newContact, name: e.target.value})}
            placeholder="Enter contact name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={newContact.email}
            onChange={(e) => setNewContact({...newContact, email: e.target.value})}
            placeholder="Enter contact email"
          />
        </div>

        <div className="form-field">
          <label htmlFor="relationship">Relationship:</label>
          <select
            id="relationship"
            value={newContact.relationship}
            onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
          >
            <option value="">Select relationship</option>
            <option value="family">Family Member</option>
            <option value="friend">Friend</option>
            <option value="lawyer">Lawyer</option>
            <option value="executor">Estate Executor</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Contact
        </button>
      </form>

      <div className="contacts-list">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <p>{contact.email}</p>
              <span className="relationship">{contact.relationship}</span>
            </div>
            <button 
              onClick={() => onRemoveContact(contact.id)}
              className="remove-contact"
            >
              <img src={deleteIcon} alt="Remove contact" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustedContacts;