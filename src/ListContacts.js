import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import {Link} from 'react-router-dom';

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (newQuery) => {
        this.setState({query: newQuery.trim()})
    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        let showingContacts;
        // destructuring objects
        const {contacts, onDeleteContact, onNavigate} = this.props
        const {query} = this.state

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i'); // automatycznie escapuj specjalne znaki + i = ignore case
            showingContacts = contacts.filter((c) => match.test(c.name));
        } else {
            showingContacts = contacts;
        }

        showingContacts.sort(sortBy('name')); // sortuje obiekty po danym atrybucie

        return (
            <div className='list-contacts'>
                <div class="list-contacts-top">
                    <input className='search-contacts'
                           type='text'
                           placeholder='Search contacts'
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}/>
                    <Link to='/create' className='add-contact'>Add contact</Link>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts;