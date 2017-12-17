import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
    state = {
        contacts: []
    };

    componentDidMount() {
        ContactsAPI.getAll().then((contactsFromAPI) => {
            this.setState({
                contacts: contactsFromAPI
            })
        })
    }

    /*
        fat arrow notation assures us that 'this' will point to App component
        even when called from within ListContacts component (or any other)
     */
    removeContact = (contact) => {
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter((c) => c.id !== contact.id)
        }))

        ContactsAPI.remove(contact);
    }

    createContact(formValues) {
        ContactsAPI.create(formValues).then(contactFromTheServer => {
            this.setState((prevState) => ({
                contacts: prevState.contacts.concat(contactFromTheServer)
            }))
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                        <ListContacts onDeleteContact={this.removeContact}
                                      contacts={this.state.contacts}/>
                )}/>
                <Route path="/create" render={({history}) => (
                    <CreateContact onCreateContact={(contact) => {
                        this.createContact(contact)
                        history.push('/')
                    }}/>
                )}/>
            </div>
        )
    }
}

export default App;
